import React from "react";
import {
  Box,
  Typography,
  Card,
  Avatar,
  AvatarGroup,
  Stack,
  Divider,
  Tooltip,
} from "@mui/material";
import { AccessTime } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { getTimeLeft } from "../../constants/DateTime";
import { Link } from "react-router-dom";

export default function TaskCard({ task }) {
  const { user } = useSelector((state) => state.user);
  
  return (
    <Box my={3}>
      <Card
        background="white"
        sx={{
          py: 3,
          px: 3,
          borderRadius: 2,
          boxShadow: "2.82px 2.82px 15.03px 0px rgba(0, 0, 0, 0.08)",
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={2}
        >
          <Link
            to={`/individual-task/${task._id}`}
            style={{ textDecoration: "none", color: "unset" }}
          >
            <Stack>
              <Typography
                variant="h6"
                fontWeight="500"
                fontFamily="inherit"
                component="p"
              >
                {task.title}
              </Typography>
              <Typography
                variant="caption"
                component="p"
                color="rgba(54, 57, 66, 1)"
              >
                {user.team.name}
              </Typography>
              <Typography
                variant="caption"
                component="p"
                color="rgba(54, 57, 66, 1)"
              >
                {`Assigned By: ${task.assigned_by.full_name}`}
              </Typography>
            </Stack>
          </Link>
          <AvatarGroup max={6}>
            {task.assigned_to.map((assignee, index) => (
              <Tooltip title={assignee.full_name} key={index}>
                <Avatar
                  alt={assignee.full_name}
                  src={assignee.profile_image_url}
                  sx={{ width: 20, height: 20 }}
                />
              </Tooltip>
            ))}
          </AvatarGroup>
        </Stack>
        <Divider />
        <Stack direction="row" alignItems="center" gap={1} mt={2}>
          <AccessTime fontSize="small" />
          <Typography variant="caption" component="p" sx={{ color: "grey" }}>
            {getTimeLeft(task.dueTime)}
          </Typography>
        </Stack>
      </Card>
    </Box>
  );
}
