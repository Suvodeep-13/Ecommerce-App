import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { commerce } from '../../lib/commerce';

import FormInput from './CustomTextField';

const AddressForm  = ({checkoutToken, next}) => {
  const [shippingCountries, setShippingCountries] = useState([]);
  const [shippingCountry, setShippingCountry] = useState('');
  const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
  const [shippingSubdivision, setShippingSubdivision] = useState('');
  const [shippingOptions, setShippingOptions] = useState([]);
  const [shippingOption, setShippingOption] = useState('');
  const methods = useForm();

  const countries = Object.entries(shippingCountries).map(({code, name}) => ({id: code, label:name}));
  const subdivisions = Object.entries(shippingSubdivisions).map(({code, name}) => ({id: code, label:name}));

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);

    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchSubdivisions = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

    setShippingSubdivisions(subdivisions);
    setShippingSubdivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region: stateProvince });

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id);
  }, []);

  useEffect(() => {
    if (shippingCountry) fetchSubdivisions(shippingCountry);
  }, [shippingCountry]);

  useEffect(() => {
    if (shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision);
  }, [shippingSubdivision]);

  return (
    <>
      <Typography variant='h6' gutterBottom>Shipping Address</Typography>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision}))}>
            <Grid container spacing={3}>
                <FormInput required = 'required' name='firstname' label='First Name' />
                <FormInput required = 'required' name='lastname' label='Last Name' />
                <FormInput required = 'required' name='address1' label='Address' />
                <FormInput required = 'required' name='email' label='Email' />
                <FormInput required = 'required' name='city' label='City' />
                <FormInput required = 'required' name='zip' label='ZIP / Postal code' />
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={shippingCountry} fullWidth onChange={(e) => shippingCountry(e.target.value)}>
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Subdivison</InputLabel>
                    <Select value={shippingSubdivision} fullWidth onChange={(e) => shippingSubdivision(e.target.value)}>
                    {subdivisions.map((subdivision) => (
                            <MenuItem key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select value={} fullWidth onChange={}>
                        <MenuItem key={} value={}>
                            Select Me
                        </MenuItem>
                    </Select>
                </Grid> */}
            </Grid>
            <br/>
            <div style={{ display:'flex', justifyContent:'space-between' }}>
                <Button component={Link} to="/cart" variant='contained' color='secondary'> Back to Cart</Button>
                <Button type="submit" variant='contained' color='primary'>Next</Button>
            </div>
        </form>
      </FormProvider>
    </>
  )
}

export default AddressForm 