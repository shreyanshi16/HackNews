import React, { useState } from "react";
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from "mdb-react-ui-kit";
const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <MDBNavbar expand="lg">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <h4>ATLIQ NEWS 👋</h4>
          </MDBNavbarBrand>
          <MDBCollapse show={show} navbar>
            <MDBNavbarNav className="me-auto mb-2 mb-lg-0">
              <MDBNavbarItem className="active">
                <MDBNavbarLink
                  aria-current="page"
                  href="/"
                  styles={{ color: "#fff" }}
                >
                  HOME
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="/addNews" styles={{ color: "#fff" }}>
                  ADD NEWS
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </div>
  );
};

export default Header;
