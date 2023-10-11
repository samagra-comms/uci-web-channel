import React, { FC } from 'react';
import { MDBBadge, MDBListGroup, MDBListGroupItem } from 'mdb-react-ui-kit';

const ListItem :FC<any>=({name,image,date,showNewBadge})=> {
  return (
    <MDBListGroup style={{ minWidth: '22rem' }} light>
   
      <MDBListGroupItem className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center'>
          <img
            src={image}
            alt=''
            style={{ width: '45px', height: '45px' }}
            className='rounded-circle'
          />
          <div className='ms-3'>
            <p className='fw-bold mb-0'>{name}</p>
            <p className='text-muted mb-0'>{date}</p>
          </div>
        </div>
       {showNewBadge && <MDBBadge pill light color='primary'>
          Onboarding
        </MDBBadge>}
      </MDBListGroupItem>
    
    </MDBListGroup>
  );
}


export default ListItem