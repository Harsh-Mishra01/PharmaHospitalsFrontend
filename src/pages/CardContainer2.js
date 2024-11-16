import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import ReviewRating from "./ReviewRating";

export default function CardContainer2() {
  return (
    <div>
      <Grid container spacing={1} sx={{ ml: 3.5,  }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ width: 250, height: 136, maxWidth: "100%", m: 2, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="caption">Google Search Mobile</Typography>
              <Typography variant="h4">123</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ width: 250, height: 136, maxWidth: "100%", m: 2, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="caption">Google Search Desktop</Typography>
              <Typography variant="h4">105</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ width: 250, height: 136, maxWidth: "100%", m: 2, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="caption">Google Maps Mobile</Typography>
              <Typography variant="h4">167</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ width: 250, height: 136, maxWidth: "100%", m: 2, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="caption">Google Maps Desktop</Typography>
              <Typography variant="h4">230</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ width: 250, height: 136, maxWidth: "100%", m: 2, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="caption">Calls</Typography>
              <Typography variant="h4">135</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ width: 250, height: 136, maxWidth: "100%", m: 2, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="caption">Directions</Typography>
              <Typography variant="h4">175</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ width: 250, height: 136, maxWidth: "100%", m: 2, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="caption">Websit Clicks</Typography>
              <Typography variant="h4">145</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Card
            variant="outlined"
            sx={{ width: 250, height: 136, maxWidth: "100%", m: 2, borderRadius: 2 }}
          >
            <CardContent>
              <Typography variant="caption">Searches</Typography>
              <Typography variant="h4">105</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
