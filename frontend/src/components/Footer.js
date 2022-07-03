import React from 'react';
import {
  AiFillInstagram,
  AiFillYoutube,
  AiFillFacebook
} from 'react-icons/ai';
import {
  MailOutline,
  Phone,
  Room,
} from "@material-ui/icons";

import {
  FooterLink,
  FooterLinkTitle,
  FooterLinksContainer,
  FooterLinksItems,
  FooterLinksWrapper,
  FooterContainer,
  SocialMedia,
  SocialMediaWrapper,
  SocialLogo,
  WebsiteRights,
  SocialIcons,
  SocialIconLink,
  Logo,
  Title,
  Payment,
  ContactItem
} from '../styles/stylesComponents/StyleFooter';

const Footer = () => {

  const login = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : [];

  return (
    <FooterContainer>
      {login.role === "ADMIN" ? (
        <></>
      ) : (
        <FooterLinksContainer>
          <FooterLinksWrapper>
            <FooterLinksItems>
              <FooterLinkTitle>CONTACT US</FooterLinkTitle>
              <ContactItem>
                <Phone style={{ marginRight: "10px" }} /> +39 000 000 00 00
              </ContactItem>
              <ContactItem>
                <MailOutline style={{ marginRight: "10px" }} /> contact@chagest.com
              </ContactItem>
              <ContactItem>
                <Room style={{ marginRight: "10px" }} /> Street unknow 3, 43125 PR
              </ContactItem>
              <Payment src="https://res.cloudinary.com/dcdkw4ylr/image/upload/v1656335002/logo/iaq4zuicq9yix3xi9ef4.png" alt='payment-image' />
            </FooterLinksItems>
            <FooterLinksItems>
              <FooterLinkTitle>ABOUT US</FooterLinkTitle>
              <FooterLink to='/information'>Our Information</FooterLink>
              <FooterLink to='/privacy'>Privacy Theme</FooterLink>
            </FooterLinksItems>
            <FooterLinksItems>
              <FooterLinkTitle>SOCIAL MEDIA</FooterLinkTitle>
              <FooterLink to='/intagram'>Instagram</FooterLink>
              <FooterLink to='/facebook'>Facebook</FooterLink>
              <FooterLink to='/youtube'>Youtube</FooterLink>
            </FooterLinksItems>
            <FooterLinksItems>
              <FooterLinkTitle>USEFUL LINKS</FooterLinkTitle>
              <FooterLink to='/'>Home</FooterLink>
              <FooterLink to='/products'>All products</FooterLink>
              <FooterLink to='/cart'>Cart</FooterLink>
              <FooterLink to='/#'>My Account</FooterLink>
              <FooterLink to='/#'>Order Tracking</FooterLink>
              <FooterLink to='/#'>Wishlist</FooterLink>
            </FooterLinksItems>
          </FooterLinksWrapper>
        </FooterLinksContainer>
      )}
      <SocialMedia>
        <SocialMediaWrapper>
          <SocialLogo to="/">
            <Logo src="https://res.cloudinary.com/dcdkw4ylr/image/upload/v1656334924/logo/kzduo2xqybwgkgap0uuj.png" alt='logo' />
            <Title>ESHOP</Title>
          </SocialLogo>
          <WebsiteRights>
            © Copyright 2022 - All Rights Reserved by Christian KEMGANG NGUESSOP 👨🏾‍💻
          </WebsiteRights>
          <SocialIcons>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <AiFillInstagram />
            </SocialIconLink>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <AiFillFacebook />
            </SocialIconLink>
            <SocialIconLink href="#" target="_blank" rel="noopener noreferrer" aria-label="Youtube">
              <AiFillYoutube />
            </SocialIconLink>
          </SocialIcons>
        </SocialMediaWrapper>
      </SocialMedia>
    </FooterContainer>

  );
};

export default Footer;