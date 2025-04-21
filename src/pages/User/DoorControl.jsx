import React, { useState, useEffect } from "react";
import "../../scss/door.scss"; // Assuming this path is correct
import door1 from "../../assets/picture/door.png"; // Assuming this path is correct
import door2 from "../../assets/picture/door2.gif"; // Assuming this path is correct
import adafruitApi from "../../service/AdafruitService";
import { toast } from "react-toastify";

function DoorControl({ initUnlockStatus }) {
  // --- State Variables ---
  const [status, setStatus] = useState(
    initUnlockStatus ? "Unlocked" : "Locked"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);
  const [history, setHistory] = useState([]);
  const [showChangeTrigger, setShowChangeTrigger] = useState(true);
  const [showChangeForm, setShowChangeForm] = useState(false);
  const [newCode, setNewCode] = useState("");
  const [failCount, setFailCount] = useState(0);
  const [alertVisible, setAlertVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- Helper Functions ---
  const addToHistory = (result) => {
    const entry = { time: new Date(), result };
    setHistory((prev) => [entry, ...prev]);
  };

  useEffect(() => {
    setStatus(initUnlockStatus ? "Unlocked" : "Locked");
  }, [initUnlockStatus]);

  // --- Effects ---
  useEffect(() => {
    let timer;
    if (alertVisible) {
      timer = setTimeout(() => setAlertVisible(false), 5000);
    }
    return () => clearTimeout(timer);
  }, [alertVisible]);

  const handleUnlock = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");
    setShake(false);

    try {
      // Call the API using your adafruitApi module
      await adafruitApi.unlockDoor({ password: password }); // Pass data object

      // --- SUCCESS --- (Axios doesn't throw error for 2xx)
      setStatus("Unlocked");
      addToHistory("Success");
      setFailCount(0);
      setAlertVisible(false);
    } catch (err) {
      // --- FAILURE --- (Axios throws error for non-2xx)
      console.error("Unlock API error:", err);
      // Extract error message from Axios error response if possible
      const serverMessage =
        err.response?.data?.message ||
        err.message ||
        "Wrong code or server error";
      setError(serverMessage);
      toast.error(serverMessage);
      setShake(true);
      const newFailCount = failCount + 1;
      setFailCount(newFailCount);
      addToHistory("Failed");

      if (newFailCount >= 3) {
        setError(`🚨 ${serverMessage} (3+ attempts)`);
        toast.error(`🚨 ${serverMessage} (3+ attempts)`);

        setAlertVisible(true);
        addToHistory("🚨 3 Failed Attempts");
        setFailCount(0); // Reset client counter after warning
      }
      setTimeout(() => setShake(false), 500);
    } finally {
      setPassword(""); // Clear password input
      setIsLoading(false); // End loading
    }
  };

  const handleLock = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError("");

    try {
      // Call the API using your adafruitApi module
      await adafruitApi.lockDoor(); // No data needed

      // --- SUCCESS ---
      setStatus("Locked");
      addToHistory("Manually Locked");
      setShowChangeForm(false);
      setShowChangeTrigger(true);
    } catch (err) {
      // --- FAILURE ---
      console.error("Lock API error:", err);
      const serverMessage =
        err.response?.data?.message ||
        err.message ||
        "Could not lock the door.";
      setError(serverMessage);
      addToHistory("Lock Failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeCode = async () => {
    if (isLoading || newCode.trim() === "") return;
    setIsLoading(true);
    setError("");

    try {
      // Call the API using your adafruitApi module
      await adafruitApi.changePassword({ password: newCode }); // Pass data object

      // --- SUCCESS ---
      setNewCode("");
      setShowChangeForm(false);
      addToHistory("Password Updated");
      setShowChangeTrigger(true);
      setError(""); // Clear any previous error
      alert("Password updated successfully!");
    } catch (err) {
      // --- FAILURE ---
      console.error("Update Password API error:", err);
      const serverMessage =
        err.response?.data?.message ||
        err.message ||
        "Could not update password.";
      setError(serverMessage);
      addToHistory("Password Update Failed");
    } finally {
      setIsLoading(false);
    }
  };

  // --- UI Helper ---
  const getIconForResult = (result) => {
    // (Keep the existing getIconForResult function as it is)
    switch (result) {
      case "Success":
        return "🔓";
      case "Failed":
        return "❌";
      case "Auto Locked":
        return "⏱️";
      case "Password Updated":
        return "🛠️";
      case "🚨 3 Failed Attempts":
        return "🚨";
      case "Manually Locked":
        return "🔒";
      case "Lock Failed":
        return "🔒❌";
      case "Password Update Failed":
        return "🛠️❌";
      // Add specific cases if needed based on API error messages
      default:
        return "";
    }
  };

  // --- Render ---
  return (
    // (Keep the existing return JSX structure as it is)
    <div className="door-control">
      <h2>DOOR CONTROL</h2>

      {isLoading && <div className="loading-indicator">Processing...</div>}

      {alertVisible && (
        <div className="alert alert-danger text-center fw-bold">
          🚨 Warning: Multiple Failed Attempts Detected! Check history for
          details.
        </div>
      )}

      <div className="center-section">
        <h4>
          Status:
          <span
            className={`status ${status === "Unlocked" ? "open" : "locked"}`}
          >
            {status === "Unlocked" ? "🔓 Unlocked" : "🔒 Locked"}
          </span>
        </h4>

        {status === "Locked" && (
          <div className={`code-box ${shake ? "shake" : ""}`}>
            <input
              type="password"
              placeholder="Enter code"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
              disabled={isLoading}
            />
            <button
              className="btn btn-success ms-2"
              onClick={handleUnlock}
              disabled={isLoading || !password}
            >
              {isLoading ? "Unlocking..." : "Unlock"}
            </button>
          </div>
        )}

        {status === "Unlocked" && (
          <div className="code-box">
            <button
              className="btn btn-danger ms-2"
              onClick={handleLock}
              disabled={isLoading}
            >
              {isLoading ? "Locking..." : "Lock Door"}
            </button>
          </div>
        )}

        {error && <p className="text-danger mt-2">{error}</p>}

        {status === "Unlocked" && (
          <>
            {showChangeTrigger && !showChangeForm && (
              <div
                className="change-trigger mt-4"
                onClick={() => {
                  setShowChangeForm(true);
                  setShowChangeTrigger(false);
                  setError("");
                }}
                role="button"
              >
                <span className="gear-icon">⚙️</span>
                <span className="change-label ms-2">Change Password</span>
              </div>
            )}

            {showChangeForm && (
              <div className="change-code mt-3">
                <h5>Update Code</h5>
                <input
                  type="password"
                  placeholder="New code"
                  value={newCode}
                  onChange={(e) => setNewCode(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  className="btn btn-warning ms-2"
                  onClick={handleChangeCode}
                  disabled={isLoading || !newCode}
                >
                  {isLoading ? "Updating..." : "Update"}
                </button>
                <button
                  className="btn btn-secondary ms-2"
                  onClick={() => {
                    setShowChangeForm(false);
                    setShowChangeTrigger(true);
                    setNewCode("");
                    setError("");
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <div className="bottom-section mt-4">
        <div className="image-box">
          <img
            src={status === "Unlocked" ? door2 : door1}
            alt={`Door is ${status}`}
          />
        </div>

        <div className="history-box">
          <h4 className="cangiua">Access History</h4>
          {history.length === 0 ? (
            <p>No activity recorded yet.</p>
          ) : (
            <ul>
              {history.map((item, index) => (
                <li key={index}>
                  {getIconForResult(item.result)} [
                  {item.time.toLocaleTimeString()}] - {item.result}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoorControl;
