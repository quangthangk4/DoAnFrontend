import React, { useEffect, useState, useRef, useCallback } from "react";
import { format } from "date-fns";
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
  const [data, setData] = useState({
    temperature: [],
    humidity: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState(1);

  const chartRefs = {
    temperature: useRef(null),
    humidity: useRef(null),
  };

  const fetchChartData = useCallback(async (range) => {
    setLoading(true);
    try {
      const [tempRes, humRes] = await Promise.all([
        axios.get(
          `http://localhost:8080/yolohome/adafruit/temp-chart/temp/${range}`
        ),
        axios.get(
          `http://localhost:8080/yolohome/adafruit/temp-chart/humidity/${range}`
        ),
      ]);

      const formatData = (rawData) =>
        rawData.map((item) => {
          const dateObj = new Date(item.date);
          return {
            time: format(dateObj, "HH:mm"),
            fullDate: format(dateObj, "dd/MM/yyyy, hh:mm:ss a"),
            value: parseFloat(item.value),
          };
        });

      setData({
        temperature: formatData(tempRes.data.result),
        humidity: formatData(humRes.data.result),
      });

      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Lỗi khi lấy dữ liệu từ API");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchChartData(timeRange);
  }, [fetchChartData, timeRange]);

  const handleExportChart = async (ref, filename) => {
    if (!ref.current) return;
    const dataUrl = await htmlToImage.toPng(ref.current);
    const link = document.createElement("a");
    link.download = `${filename}.png`;
    link.href = dataUrl;
    link.click();
  };

  const chartsConfig = [
    {
      key: "temperature",
      label: "Biểu đồ nhiệt độ",
      color: "#1976d2",
    },
    {
      key: "humidity",
      label: "Biểu đồ độ ẩm",
      color: "#388e3c",
    },
  ];

  const renderChart = ({ key, label, color }) => {
    const chartData = data[key];

    return (
      <Box key={key} display="flex" justifyContent="center" mb={3}>
        <Card sx={{ width: "100%", maxWidth: 800, p: 2 }}>
          <CardContent ref={chartRefs[key]} sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ textTransform: "uppercase" }}
            >
              {label}
            </Typography>

            {chartData.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Không có dữ liệu
              </Typography>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length > 0) {
                        const dataPoint = payload[0].payload;
                        return (
                          <Box
                            sx={{
                              backgroundColor: "white",
                              border: "1px solid #ccc",
                              p: 1,
                              borderRadius: 1,
                            }}
                          >
                            <Typography variant="body2">
                              {dataPoint.fullDate}
                            </Typography>
                            <Typography variant="body2">
                              Giá trị: {dataPoint.value}
                            </Typography>
                          </Box>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>

          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 1 }}>
            <Button
              onClick={() => handleExportChart(chartRefs[key], label)}
              disabled={chartData.length === 0}
            >
              Export Chart
            </Button>
          </Box>
        </Card>
      </Box>
    );
  };

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
        chartsConfig.map(renderChart)
      )}
    </Box>
  );
}
