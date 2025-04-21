import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Stack,
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
import * as htmlToImage from "html-to-image";

export default function Chart() {
  const [chartDataTemp, setChartDataTemp] = useState([]);
  const [chartDataHumidity, setChartDataHumidity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(40); // mặc định 40 giờ

  const chartRefTemp = useRef(null);
  const chartRefHumidity = useRef(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [tempRes, humRes] = await Promise.all([
          axios.get(
            `http://localhost:8080/yolohome/adafruit/temp-chart/temp/${timeRange}`
          ),
          axios.get(
            `http://localhost:8080/yolohome/adafruit/temp-chart/humidity/${timeRange}`
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
        setError(null);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Lỗi khi lấy dữ liệu từ API");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [timeRange]);

  const handleExportChart = async (ref, filename) => {
    if (ref.current === null) return;
    const dataUrl = await htmlToImage.toPng(ref.current);
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  };

  const renderChart = (data, label, color, ref) => (
    <Box display="flex" justifyContent="center" mb={3}>
      <Card sx={{ width: "100%", maxWidth: 800, p: 2 }}>
        <CardContent ref={ref} sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ textTransform: "uppercase" }}
          >
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
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
          <Button onClick={() => handleExportChart(ref, label)}>
            Export Chart
          </Button>
        </Box>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <FormControl>
          <InputLabel>Khung thời gian</InputLabel>
          <Select
            value={timeRange}
            label="Khung thời gian"
            onChange={(e) => setTimeRange(Number(e.target.value))}
            sx={{ width: 150 }}
          >
            <MenuItem value={1}>1 giờ</MenuItem>
            <MenuItem value={3}>3 giờ</MenuItem>
            <MenuItem value={6}>6 giờ</MenuItem>
            <MenuItem value={12}>12 giờ</MenuItem>
            <MenuItem value={24}>1 ngày</MenuItem>
            <MenuItem value={24 * 7}>1 tuần</MenuItem>
            <MenuItem value={24 * 30}>1 tháng</MenuItem>
            <MenuItem value={24 * 90}>3 tháng</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          {renderChart(
            chartDataTemp,
            "Biểu đồ nhiệt độ",
            "#1976d2",
            chartRefTemp
          )}
          {renderChart(
            chartDataHumidity,
            "Biểu đồ độ ẩm",
            "#388e3c",
            chartRefHumidity
          )}
        </>
      )}
    </Box>
  );
}
