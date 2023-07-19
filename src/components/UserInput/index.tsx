import React, { useCallback, useState } from 'react';
import { Box } from '@chakra-ui/react'
import { Form,Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const UserInput = () => {
  const [mobile,setMobile]=useState(localStorage.getItem('mobile')|| '');
  const [auth,setAuth]=useState(localStorage.getItem('auth')|| '');
  const [botToFocus,setBotToFocus]=useState(localStorage.getItem('botToFocus')|| '');
  const [botList,setBotList]=useState(localStorage.getItem('botList')|| '');
  const [checked,setChecked] =useState(false)
   const router =useHistory();
  const onSubmit =useCallback((e)=>{
    e.preventDefault();
    
    localStorage.setItem("mobile",mobile);
    localStorage.setItem('filterList',checked ? 'True' : 'False')
    localStorage.setItem("auth",auth);
    localStorage.setItem("botToFocus",botToFocus);
    localStorage.setItem("botList",botList);
    setTimeout(()=>{
      router.push('/')
    },10);
    
  },[auth, botList, botToFocus, mobile,router,checked]);

  return (
    <Box height="100vh" width="100vw" >
      <Box className='p-3' style={{background:"white" ,minWidth:'50vw' ,color:'black',position:'absolute',top:'50%',left:"50%",transform:'translate(-50%,-50%)'}}>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="number" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Mobile" />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Auth Token</Form.Label>
        <Form.Control type="text" value={auth} onChange={(e)=>setAuth(e.target.value)} placeholder="Token" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Bot List (array of strings)</Form.Label>
        <Form.Control type="text" value={botList} onChange={(e)=>setBotList(e.target.value)} placeholder="Bot List" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Bot To Focus</Form.Label>
        <Form.Control type="text" value={botToFocus} onChange={(e)=>setBotToFocus(e.target.value)} placeholder="Bot to focus" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" checked={checked}  onChange={(e)=>setChecked(e.target.checked)} label="Filter Bots from botList" />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
      </Box>
    </Box>
  )
}






