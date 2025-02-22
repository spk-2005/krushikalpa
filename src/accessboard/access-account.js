import React from 'react';
import './accessaccount.css';
import Header1 from '../accessboard/header1';
import Signing from '../accessboard/signing';
import Intro from './intro';

export default function Accessaccount() {
  return (
    <>
    <div >
    <div id='head1'>
    <Header1/>
    </div>

    <Intro/>
    <Signing/>
    </div>
    </>

  );
}
