import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    TextField,
    Pagination,
    Box,
    Typography,
    Select,
    Grid,
    MenuItem,
    SelectChangeEvent,
    InputLabel,
    FormControl,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Button
} from '@mui/material';
import { User } from './types';

const Listing: React.FC = () => {
    const [data, setData] = useState<User[]>([]);
    const [filteredData, setFilteredData] = useState<User[]>([]);
    const [gender, setGender] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchData();
    }, [page, gender, search]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://randomuser.me/api/?seed=abc', {
                params: {
                    results: 12,
                    page: page,
                    gender: gender || undefined
                }
            });
            const result = response.data as { results: User[] };
            const fetchedData = result.results;
            const filteredData = fetchedData
                .filter(item => !gender || item.gender === gender)
                .filter(item => !search ||
                    item.name.first.toLowerCase().includes(search.toLowerCase()) ||
                    item.name.last.toLowerCase().includes(search.toLowerCase())
                );

            setData(fetchedData);
            setFilteredData(filteredData);
            setTotalPages(50);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenderChange = (event: SelectChangeEvent<string>) => {
        setGender(event.target.value as string);
        setPage(1);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleViewProfile = (user: User) => {
        navigate('/profile', { state: { user } }); 
    };

    return (
        <Box padding={2}>
            <Typography variant="h4" gutterBottom>
                User Listings
            </Typography>
            <Box display="flex" flexDirection="column" mb={2} maxWidth={400}>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    value={search}
                    onChange={handleSearchChange}
                    margin="normal"
                />
                <FormControl margin="normal">
                    <InputLabel>Gender</InputLabel>
                    <Select
                        value={gender}
                        onChange={handleGenderChange}
                        label="Gender"
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    {filteredData.length === 0 ? (
                        <Typography>No results found</Typography>
                    ) : (
                        <>
                            <Grid container spacing={2}>
                                {filteredData.length === 0 ? (
                                    <Typography>No results found</Typography>
                                ) : (
                                    filteredData.map((user) => (
                                        <Grid item xs={12} sm={6} md={4} lg={3} key={user.login.uuid}>
                                            <Card sx={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{
                                                        width: 72,
                                                        height: 72,
                                                        objectFit: 'cover',
                                                        borderRadius: '50%',
                                                        marginTop: 2
                                                    }}
                                                    image={user.picture.medium}
                                                    alt={`${user.name.first} ${user.name.last}`}
                                                />
                                                <CardContent>
                                                    <Typography variant="h6" noWrap>{`${user.name.first} ${user.name.last}`}</Typography>
                                                    <Typography color="text.secondary" noWrap>{user.email}</Typography>
                                                    <Typography color="text.secondary" noWrap>{user.location.city}, {user.location.country}</Typography>
                                                    <Typography color="text.secondary" noWrap>{user.phone}</Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={() => handleViewProfile(user)}
                                                        sx={{ mt: 1 }}
                                                    >
                                                        View Profile
                                                    </Button>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                            <Box mt={2} display="flex" justifyContent="center">
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                />
                            </Box>
                        </>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default Listing;
