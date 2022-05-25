import './App.css';
import { Container,Navbar,Offcanvas,Nav } from 'react-bootstrap';
import React, { useState } from 'react';

function App() {
  const [name, setName] = useState("");


  return (
    <div className="App">

        <>
  {[false].map((expand) => (
    <Navbar key={expand} bg="dark"  expand={expand} className="mb-3">
      <Container fluid>

      <div
      style={{
        backgroundColor: '#61dafb',
  
      }}
    >
      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
</div>
        <Navbar.Brand>
            <a className="App-link"
            href="https://github.com/Kyrasuum/HaxeTestProjects"
            target="_blank"
            rel="noopener noreferrer"
            >
            Haxe Test Projects
            </a>

        </Navbar.Brand>
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-${expand}`}
          aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
          placement="start"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
              Projects
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link onClick={() => setName("Web-Coconut")}>Web-Coconut</Nav.Link>
              <Nav.Link onClick={() => setName("hxbit-swf")}>hxbit-swf</Nav.Link>
              <Nav.Link onClick={() => setName("hxbit-js")}>hxbit-js</Nav.Link>
              <Nav.Link onClick={() => setName("heaps-swf")}>heaps-swf</Nav.Link>
              <Nav.Link onClick={() => setName("heaps-js")}>heaps-js</Nav.Link>
              <Nav.Link onClick={() => setName("heaps-cubefield-swf")}>heaps-cubefield-swf</Nav.Link>
              <Nav.Link onClick={() => setName("heaps-cubefield-js")}>heaps-cubefield-js</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  ))}
</>

<h3>{ name } Content</h3>

<iframe title="myFrame" src="http://www.youtube.com/watch?v=N-czyH3NH0w"></iframe>


  </div>

  );

  // const updateContent = (a) => {
  //   console.log(a);
  //   setName({a})
  //   console.log(a);
  // }
}



export default App;