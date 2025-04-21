import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";

export default function Chart() {
  const [chartDataTemp, setChartDataTemp] = useState([]);
  const [chartDataHumidity, setChartDataHumidity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [tempRes, humRes] = await Promise.all([
          axios.get(
            "http://localhost:8080/yolohome/adafruit/temp-chart/temp/40"
          ),
          axios.get(
            "http://localhost:8080/yolohome/adafruit/temp-chart/humidity/40"
          ),
        ]);

        const tempData = tempRes.data.result.map((item) => ({
          time: new Date(item.date).toLocaleTimeString("vi-VN", {
            hour12: false,
          }),
          value: parseFloat(item.value),
        }));

        const humidityData = humRes.data.result.map((item) => ({
          time: new Date(item.date).toLocaleTimeString("vi-VN", {
            hour12: false,
          }),
          value: parseFloat(item.value),
        }));

        setChartDataTemp(tempData);
        setChartDataHumidity(humidityData);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Lỗi khi lấy dữ liệu từ API");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const renderChart = (data, label, color) => (
    <Card sx={{ maxWidth: "100%", p: 2, mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {renderChart(chartDataTemp, "Biểu đồ nhiệt độ", "#1976d2")}
          {renderChart(chartDataHumidity, "Biểu đồ độ ẩm", "#388e3c")}
        </>
      )}
    </Box>
  );
}
