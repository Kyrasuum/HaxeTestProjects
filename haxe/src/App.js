import './App.css';
import { Container,Button,Navbar,Offcanvas,Nav,NavDropdown,Form,FormControl } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
    <body>

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
              <Nav.Link href="#action1">Link1</Nav.Link>
              <Nav.Link href="#action2">Link2</Nav.Link>
              <Nav.Link href="#action3">Link3</Nav.Link>
              <Nav.Link href="#action4">Link4</Nav.Link>
              <Nav.Link href="#action5">Link5</Nav.Link>

            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  ))}
</>

    </body>

  </div>

  );
}

export default App;