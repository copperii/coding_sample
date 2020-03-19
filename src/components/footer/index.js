import React from 'react'
import {
  FaGithub,
  FaFacebook,
  FaTwitter,
  FaDev,
  FaStackOverflow,
} from 'react-icons/fa'
import { Footer as StyledFooter, Section, Text } from '../../styles/globalStyle'
import { StyledLink, Hyperlink } from './footer.styles'
import AdSense from 'react-adsense'

const Footer = () => (
  <StyledFooter data-testid="footer">
    {/* navlink section */}
    <Section>
      <StyledLink to="/" title="Go to front page">
        Home
      </StyledLink>
      <StyledLink to="/about" title="About this site">
        About
      </StyledLink>
      <StyledLink to="/contact" title="Contact information">
        Contact
      </StyledLink>
    </Section>

    {/* social media section */}
    <Section marginTop="true">
      <Hyperlink
        target="_blank"
        href="https://github.com/copperii"
        title="Git hub source codes"
      >
        <FaGithub />
      </Hyperlink>
      <Hyperlink
        target="_blank"
        href="https://www.facebook.com/jan.kuparinen"
        title="Facebook"
      >
        <FaFacebook />
      </Hyperlink>
      <Hyperlink
        target="_blank"
        href="https://twitter.com/copperi"
        title="Twitter"
      >
        <FaTwitter />
      </Hyperlink>
      <Hyperlink target="_blank" href="https://dev.to/copperii" title="Dev.to">
        <FaDev />
      </Hyperlink>
      <Hyperlink
        target="_blank"
        href="https://meta.stackoverflow.com/users/11440341/copperi?tab=profile"
        title="Stack overflow"
      >
        <FaStackOverflow />
      </Hyperlink>
    </Section>

    {/* copyright section */}
    <Section>
      <Text>
        {' '}
        Copyright &copy; Copperi.com {new Date().getFullYear()}. All Rights
        Reserved
      </Text>
      <AdSense.Google
        client="ca-pub-6305542088798784"
        slot="9828858077"
        style={{ display: 'block' }}
        format="auto"
        responsive="true"
        layoutKey="-gw-1+2a-9x+5c"
      />
    </Section>
  </StyledFooter>
)

export default Footer
