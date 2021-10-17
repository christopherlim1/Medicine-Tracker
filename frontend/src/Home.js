import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
function Home() {
    return (
        <div style = {{backgroundColor: 'red', height: '100px'}}>
        
            <Header as='h2' color='blue' textAlign='center' margintop='0'>
                <Image class="ui mini image" src='/healthSlug.png'/>
                <h1 style = {{fontSize: '70px', whiteSpace:'nowrap',  display:'inline'}}>Medicine tracker</h1>
                <Image style = {{position: 'fixed', right: '0'}} class="ui mini image" src='/healthSlug.png'/>
            </Header>
        </div>
    );
}

export default Home;

