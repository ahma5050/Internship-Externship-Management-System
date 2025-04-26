import React from "react";
import {Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle} from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';
import { Link } from "react-router-dom";
const Footers = () => {
  return (
    <Footer className="">
      <div className="w-full">
        <div className="lg:flex justify-between px-5 items-center border-t-black/30 dark:border-none">
          <div className="flex flex-col items-center py-5 text-gray-500 dark:text-white font-serif">
            <Link to="/" className="text-xl font-semibold font-serif">
              <span className="text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white px-3 py-0.5 self-center font-bold">
                @m
              </span>
              'erudite
            </Link>       
            <h1 className="font-thin">The Foters some thing to know</h1>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 items-center">
            <div className="text-center py-10 font-serif">
              <Footer.Title title="About"/>
              <FooterLinkGroup col >
                <FooterLink href="https://www.100jsprojects.com" target="_blanck" rel="hello dear">100+, Projects</FooterLink>
                <FooterLink href="https://www.100jsprojects.com" target="_blanck" rel="hello dear">Blog,s</FooterLink>
                <FooterLink href="https://www.100jsprojects.com" target="_blanck" rel="hello dear">websit.io.net</FooterLink>
              </FooterLinkGroup>
            </div>
            <div className="text-center py-5 font-serif">
              <FooterTitle title="FOLLOW US" />
              <FooterLinkGroup col>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >Git Hub</FooterLink>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >Flowert</FooterLink>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >link,s Formater</FooterLink>
              </FooterLinkGroup>
            </div>
            <div className="text-center py-5 font-serif">
              <FooterTitle title="STERO LINK" />
              <FooterLinkGroup col>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >Get Off</FooterLink>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >Listed Over</FooterLink>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >Chatch Dinaging</FooterLink>
              </FooterLinkGroup>
            </div>
            <div className="text-center py-5 font-serif">
              <FooterTitle title="CONTECT FOR" />
              <FooterLinkGroup col>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >Links Hubs</FooterLink>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >Strock Fidarity</FooterLink>
                <FooterLink href="http/amazon.com" target="_blanck" rel="i ame only" >Debaging Error</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>
        <div>
          <FooterDivider className="text-white border border-gray-200"/>
          <div className="md:flex items-center justify-between px-5">
            <div className="text-center font-serif text-white"><Footer.Copyright href="#" by="Ahmisha,tekisha" year={new Date().getFullYear()} className="text-white text-md "/></div>
            <div className="flex gap-5 justify-center py-7 font-sans">
  <Footer.Icon href="#" icon={BsFacebook} className="text-white" />
  <Footer.Icon href="#" icon={BsDribbble} className="text-white" />
  <Footer.Icon href="#" icon={BsGithub} className="text-white" />
  <Footer.Icon href="#" icon={BsInstagram} className="text-white" />
  <Footer.Icon href="#" icon={BsTwitter} className="text-white" />
</div>

            </div>
          </div>
      </div>
    </Footer>
  );
};

export default Footers;
