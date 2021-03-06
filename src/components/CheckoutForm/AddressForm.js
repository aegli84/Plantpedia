import {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import { useForm, FormProvider } from 'react-hook-form'
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';
import FormInput from './CustomTextField'


const AddressForm = ({ checkoutToken, test }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const methods = useForm();

    const fetchShippingCountries = async (checkoutTokenId) => {
        //API call
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
        setShippingCountry(Object.keys(countries)[0]);
    }

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

        setShippingOptions(options);
        setShippingOption(options[0]);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id);
    }, [checkoutToken.id]);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);
    
    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
    }, [checkoutToken.id, shippingCountry,shippingSubdivision]); 

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit((data) => test({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                    <Grid container spacing={2}>
                        <FormInput required name='firstName' label='First Name'/>
                        <FormInput required name="lastName" label="Last name" />
                        <FormInput required name="address" label="Address" />
                        <FormInput required name="email" label="Email" />
                        <FormInput required name="city" label="City" />
                        <FormInput required name="zip" label="Zip / Postal code" />
                        <Grid item xs={12} sm={6} spacing={2}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                            {Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name})).map((item) =>(
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={6} gutterBottom>
                            <InputLabel style={{ paddingTop: '15px' }}>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                            {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel style={{ paddingTop: '15px' }}>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                            {shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                        <br/>
                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <Button component={Link} variant="contained" style={{ backgroundColor: '#7e66a3', color: 'whitesmoke', minWidth: '140px' }} to="/Cart">Back to Cart</Button>
                            <Button type="submit" variant="contained" style={{ backgroundColor: '#83a46f', color: 'whitesmoke', minWidth: '140px' }}>Next</Button>
                        </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
