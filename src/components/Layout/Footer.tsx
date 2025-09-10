import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary-900 text-white">
      <div className="container-max section-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent-400 rounded-lg flex items-center justify-center">
                <span className="text-primary-900 font-bold text-sm">MUN</span>
              </div>
              <span className="font-bold text-xl">SchoolMUN</span>
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed">
              Empowering the next generation of global leaders through Model United Nations education and diplomacy.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors duration-200">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors duration-200">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-accent-400 transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                About the Event
              </Link>
              <Link to="/committees" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                Committees
              </Link>
              <Link to="/registration" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                Registration
              </Link>
              <Link to="/resources" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                Resources
              </Link>
              <Link to="/faq" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                FAQ
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Support</h3>
            <div className="space-y-2">
              <Link to="/contact" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                Contact Us
              </Link>
              <a href="#" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                Help Center
              </a>
              <a href="#" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                Privacy Policy
              </a>
              <a href="#" className="block text-neutral-300 hover:text-accent-400 transition-colors duration-200 text-sm">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-accent-400" />
                <span className="text-neutral-300 text-sm">info@schoolmun.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-accent-400" />
                <span className="text-neutral-300 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-accent-400 mt-0.5" />
                <span className="text-neutral-300 text-sm">
                  123 Education Ave<br />
                  Learning City, LC 12345
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-800 mt-8 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © 2024 SchoolMUN. All rights reserved. Built with passion for education and diplomacy.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;