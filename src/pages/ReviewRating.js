import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { CardHeader } from "@mui/material";

function ReviewRating() {
    return (
    
    <Box sx={{ margin: "0 auto",  height: "300"}}> {/* Adjusted margin and padding */}
      <Grid container spacing={2} >
        <Grid item xs={12}>
          <Card
            variant="outlined"
            sx={{ width: "100%", maxWidth: 800, m: 2, borderRadius: 2 }}
          >
            <CardHeader
              title={<Typography variant="caption">Verified Profiles</Typography>}
              sx={{ backgroundColor: "#A19EC9", color: "#fff" }}
            />

                      <CardContent sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Grid container direction="column" spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" sx={{ width: 180, height: 100, maxWidth: '100%' , borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="caption">Total Profiles</Typography>
                      <Typography variant="h4">123</Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" sx={{ width: 180, height: 100, maxWidth: '100%', borderRadius: 2 }}>
                    <CardContent>
                      <Typography variant="caption">Active Profiles</Typography>
                      <Typography variant="h4">89</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ReviewRating;
