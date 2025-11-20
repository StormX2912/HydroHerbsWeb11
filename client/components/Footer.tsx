import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to subscribe");
      }

      setMessage({ type: "success", text: data.message });
      setEmail("");
      setTimeout(() => setMessage(null), 5000);
    } catch (error: any) {
      setMessage({ type: "error", text: error.message || "Failed to subscribe. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="w-full bg-[#2A1515] text-white py-12 sm:py-14 md:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-akatab font-bold text-lg mb-4">HydroHerbs</h3>
            <p className="font-akatab text-sm opacity-80 leading-relaxed">
              Handcrafted natural tea infusions designed to nourish your body
              and elevate your daily wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-akatab font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="font-akatab text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-akatab font-bold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 opacity-80" />
                <a
                  href="mailto:thehydroherbs@gmail.com"
                  className="font-akatab text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  thehydroherbs@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 opacity-80" />
                <a
                  href="tel:+918179892062"
                  className="font-akatab text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  +91 81798 92062
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 opacity-80 mt-1" />
                <span className="font-akatab text-sm opacity-80">
                  Hyderabad, India
                </span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-akatab font-bold text-lg mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/thehydroherbs/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-white/10 rounded-lg p-5 sm:p-6 md:p-8 mb-10 sm:mb-12">
          <h3 className="font-akatab font-bold text-lg sm:text-xl mb-2">
            Subscribe to Our Newsletter
          </h3>
          <p className="font-akatab text-xs sm:text-sm opacity-80 mb-4">
            Get wellness tips and exclusive offers delivered to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isSubmitting}
              className="flex-1 px-4 py-2.5 sm:py-2 rounded-lg bg-white text-[#2A1515] font-akatab text-sm sm:text-base placeholder-opacity-50 focus:outline-none disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 sm:py-2 bg-[#C2FF65] hover:bg-[#b0e652] disabled:bg-[#C2FF65]/50 disabled:cursor-not-allowed text-[#2A1515] font-akatab font-bold text-sm sm:text-base rounded-lg transition-colors whitespace-nowrap"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
          {message && (
            <p className={`font-akatab text-xs sm:text-sm mt-3 ${
              message.type === "success" ? "text-[#C2FF65]" : "text-red-300"
            }`}>
              {message.text}
            </p>
          )}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/20 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-akatab text-xs sm:text-sm opacity-70 text-center sm:text-left">
            &copy; 2025 HydroHerbs. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="#"
              className="font-akatab text-xs sm:text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-akatab text-xs sm:text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="font-akatab text-xs sm:text-sm opacity-70 hover:opacity-100 transition-opacity"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
