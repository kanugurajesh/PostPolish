import { Github, Linkedin, Globe } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-6 bg-gradient-to-r from-gray-800 to-gray-900 text-white mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Created by Kanugu Rajesh</h3>
            <p className="text-gray-300">Transforming LinkedIn posts with AI-powered optimization</p>
          </div>
          
          <div className="flex space-x-6">
            <a
              href="https://github.com/kanugurajesh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <Github className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com/in/rajesh-kanugu-aba8a3254/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a
              href="https://kanugurajesh.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              <Globe className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
