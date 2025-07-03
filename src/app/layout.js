// No font imports, using default browser fonts
// import { Inter } from 'next/font/google';
// const inter = Inter({ subsets: ['latin'] }); // No longer needed without Inter font import

export const metadata = {
    title: 'Next.js Chat App',
    description: 'Simple real-time chat with Next.js and Socket.io',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}