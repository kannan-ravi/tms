import React from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import image from "../../assets/images/Header.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { calculateChecklistPercentage } from "../../constants/taskFunctions";

export default function TimeLimitCard({ task }) {
  const { user } = useSelector((state) => state.user);
  
  return (
    <Box
      sx={{
        border: 1,
        borderRadius: 3,
        boxShadow: 3,
        borderColor: "lightgray",
        overflow: "hidden",
      }}
    >
      <Link
        to={
          task.isAssignedByTeamMember || task.isAssignedToMe
            ? `/individual-task/${task._id}`
            : ""
        }
      >
        <Stack
          gap={0.5}
          minHeight="100px"
          position="relative"
          sx={{
            background: `linear-gradient(
            rgba(0, 0, 0, 0.5),
            rgba(0, 0, 0, 0.5)
          ),
          url(${image})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              right: "0.8rem",
            }}
          >
            <Typography
              component="p"
              variant="body2"
              color="rgba(248, 246, 255, 1)"
            >
              {task?.title.length > 20 ? `${task?.title.slice(0, 20)}...` : task?.title}
            </Typography>
            <Typography
              component="p"
              variant="caption"
              color="rgba(248, 246, 255, 1)"
            >
              {/* {user.team.name} */}
              {user.team.name.length > 21 ? `${user.team.name.slice(0, 21)}...` : user.team.name}
            </Typography>
          </Box>
        </Stack>
      </Link>

      <Stack
        direction="row"
        p={2}
        alignItems="center"
        justifyContent="space-between"
        gap={2}
      >
        <Stack gap={0.5} width="100%">
          <Typography component="p" variant="body2" fontWeight="bold">
            {calculateChecklistPercentage(
              task.checkedCount,
              task.checklist.length
            )}{" "}
            %
          </Typography>
          <LinearProgress
            variant="determinate"
            value={calculateChecklistPercentage(
              task.checkedCount,
              task.checklist.length
            )}
            color="secondary"
            sx={{ width: "100%" }}
          />
        </Stack>
        <AvatarGroup spacing="medium">
          {task.assigned_to.map((assignee) => (
            <Tooltip title={assignee.full_name} key={assignee._id}>
              <Avatar
                alt={assignee.full_name}
                src={assignee.profile_image_url}
                sx={{ width: 20, height: 20 }}
              />
            </Tooltip>
          ))}
        </AvatarGroup>
      </Stack>
    </Box>
  );
}
