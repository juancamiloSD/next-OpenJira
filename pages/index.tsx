import { NextPage } from 'next'
import { Layout } from '@/components/layouts';
import { Card, CardContent, CardHeader, Grid } from '@mui/material';
import { EntryList } from '../components/ui';
import { NewEntry } from '../components/ui/NewEntry';

const HomePage: NextPage = () => {
  return (
    <Layout title="Home - OpenJira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Pendientes"/>
            <NewEntry />
            <EntryList status="pending"/>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="En Progreso"/>
            <EntryList status="in-progress"/>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px)' }}>
            <CardHeader title="Completadas"/>
            <EntryList status="finished"/>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage