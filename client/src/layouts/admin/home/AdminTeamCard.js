import { Delete, Edit } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { environment } from "../../../constants/environment";
import { useDispatch } from "react-redux";
import { deleteTeam } from "../../../app/features/teamSlice";
import { toastError, toastSuccess } from "../../../app/features/toastSlice";

export default function AdminTeamCard({ team }) {
  const dispatch = useDispatch();
  const handleTeamDelete = async () => {
    try {
      const response = await fetch(`${environment}/api/teams/${team._id}`, {
        method: "DELETE",
      }).then((res) => res.json());
      dispatch(deleteTeam(team._id));
      dispatch(toastSuccess("Team Deleted Successfully"));
    } catch (error) {
      dispatch(toastError(error.message || "Something Went Wrong"));
      console.log(error);
    }
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={2}
      justifyContent="space-between"
      py={1}
      key={team._id}
      backgroundColor="rgba(237, 237, 255, 1)"
      borderRadius={2}
      px={2}
    >
      <Typography component="h3" variant="body1">
        {team.name}
      </Typography>

      <Box>
        <IconButton aria-label="delete">
          <Edit fontSize="small" />
        </IconButton>
        <IconButton aria-label="delete" onClick={handleTeamDelete}>
          <Delete fontSize="small" color="error" />
        </IconButton>
      </Box>
    </Stack>
  );
}
