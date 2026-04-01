import "./globals.css";

export const metadata = {
  title: "Sounds Good Pro",
  description: "Vocal Coach for Unchained Melody",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
