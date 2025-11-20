import Navigation from "@/components/Navigation";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Star } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    name: "", // Combined name for API
    message: "",
    blend: "",
    tasteRating: "5",
    aromaRating: "5",
    packagingRating: "5",
    overallExperience: "5",
    wouldBuy: "",
    likedMost: "",
    stoodOut: "",
    improve: "",
  });

  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Combine first and last name, convert string ratings to numbers
      const submissionData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        blend: formData.blend,
        tasteRating: parseInt(formData.tasteRating, 10),
        aromaRating: parseInt(formData.aromaRating, 10),
        packagingRating: parseInt(formData.packagingRating, 10),
        overallExperience: parseInt(formData.overallExperience, 10),
        wouldBuy: formData.wouldBuy || undefined,
        likedMost: formData.likedMost || undefined,
        stoodOut: formData.stoodOut || undefined,
        improve: formData.improve || undefined,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit feedback");
      }

      setSubmitSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        name: "",
        message: "",
        blend: "",
        tasteRating: "5",
        aromaRating: "5",
        packagingRating: "5",
        overallExperience: "5",
        wouldBuy: "",
        likedMost: "",
        stoodOut: "",
        improve: "",
      });
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error: any) {
      console.error("Submission error:", error);
      setSubmitError(error.message || "Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col">
      <Navigation />
      
      {/* Split Layout: Form Left, Map Right */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-80px)] pt-20 lg:pt-0 overflow-x-hidden w-full">
        {/* Left Side - Contact Form */}
        <div className="w-full lg:w-1/2 bg-[#2A1515] flex flex-col items-center justify-center py-12 sm:py-16 px-4 sm:px-6 md:px-8 lg:px-12 overflow-x-hidden">
          {/* Star Icon */}
          <div className="mb-6">
            <Star className="w-6 h-6 text-white opacity-80" fill="white" />
          </div>

          {/* Heading */}
          <h1 className="font-akatab font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-4 text-center uppercase tracking-tight">
            Feedback
          </h1>

          {/* Description */}
          <p className="font-akatab text-sm sm:text-base text-white opacity-80 text-center mb-8 max-w-md">
            Fill out the form, and we'll be in touch soon! For any urgent inquiries, reach out directly at{" "}
            <a href="tel:+918179892062" className="underline hover:opacity-100">+91 81798 92062</a> or{" "}
            <a href="mailto:thehydroherbs@gmail.com" className="underline hover:opacity-100">thehydroherbs@gmail.com</a> for a faster response.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5 px-2 sm:px-0">
            {/* Success Message */}
            {submitSuccess && (
              <div className="bg-[#C2FF65] text-[#2A1515] p-4 rounded-xl font-akatab font-semibold text-center">
                ✓ Thank you for your feedback! We'll review it shortly.
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-xl font-akatab font-semibold text-center">
                ✗ {submitError}
              </div>
            )}

            {/* Name Field - Split into First and Last */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                  First Name <span className="text-[#DF758A]">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all"
                />
              </div>
              <div>
                <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                  Last Name <span className="text-[#DF758A]">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                Email <span className="text-[#DF758A]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all"
              />
            </div>

            {/* General Message */}
            <div>
              <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                Ask us anything or share your thoughts:
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message..."
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all resize-none"
              />
            </div>

            {/* Blend Dropdown */}
            <div>
              <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                Which blend did you try? <span className="text-[#DF758A]">*</span>
              </label>
              <select
                name="blend"
                value={formData.blend}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-black focus:outline-none focus:border-white/50 transition-all"
              >
                <option value="">Select a blend</option>
                <option value="skin-glow">Skin Glow Blend</option>
                <option value="hair-vitality">Hair Vitality Blend</option>
                <option value="peace-flow">Peace Flow Blend</option>
              </select>
            </div>

            {/* Ratings Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                  Taste Rating (1-10)
                </label>
                <input
                  type="number"
                  name="tasteRating"
                  min="1"
                  max="10"
                  value={formData.tasteRating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white focus:outline-none focus:border-white/50 transition-all"
                />
              </div>
              <div>
                <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                  Aroma Rating (1-10)
                </label>
                <input
                  type="number"
                  name="aromaRating"
                  min="1"
                  max="10"
                  value={formData.aromaRating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white focus:outline-none focus:border-white/50 transition-all"
                />
              </div>
              <div>
                <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                  Packaging Rating (1-10)
                </label>
                <input
                  type="number"
                  name="packagingRating"
                  min="1"
                  max="10"
                  value={formData.packagingRating}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white focus:outline-none focus:border-white/50 transition-all"
                />
              </div>
              <div>
                <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                  Overall Experience (1-10)
                </label>
                <input
                  type="number"
                  name="overallExperience"
                  min="1"
                  max="10"
                  value={formData.overallExperience}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white focus:outline-none focus:border-white/50 transition-all"
                />
              </div>
            </div>

            {/* Would You Buy */}
            <div>
              <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                Would you buy HydroHerbs if it launched today?
              </label>
              <select
                name="wouldBuy"
                value={formData.wouldBuy}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-black focus:outline-none focus:border-white/50 transition-all"
              >
                <option value="">Select an option</option>
                <option value="definitely">Definitely</option>
                <option value="probably">Probably</option>
                <option value="maybe">Maybe</option>
                <option value="probably-not">Probably Not</option>
                <option value="definitely-not">Definitely Not</option>
              </select>
            </div>

            {/* What did you like the most */}
            <div>
              <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                What did you like the most?
              </label>
              <textarea
                name="likedMost"
                value={formData.likedMost}
                onChange={handleChange}
                placeholder="Tell us what you loved..."
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all resize-none"
              />
            </div>

            {/* What stood out */}
            <div>
              <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                Tell us what stood out...
              </label>
              <textarea
                name="stoodOut"
                value={formData.stoodOut}
                onChange={handleChange}
                placeholder="Share your experience..."
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all resize-none"
              />
            </div>

            {/* What could we improve */}
            <div>
              <label className="block font-akatab font-bold text-white opacity-90 mb-2 text-sm">
                What could we improve?
              </label>
              <textarea
                name="improve"
                value={formData.improve}
                onChange={handleChange}
                placeholder="Your suggestions..."
                rows={3}
                className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-xl font-akatab text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all resize-none"
              />
            </div>

            {/* Newsletter Checkbox */}
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="newsletter"
                defaultChecked
                className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-[#C2FF65] focus:ring-2 focus:ring-[#C2FF65] focus:ring-offset-0"
              />
              <label htmlFor="newsletter" className="font-akatab text-sm text-white opacity-90">
                Yes, subscribe me to your newsletter. <span className="text-[#DF758A]">*</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#2A1515] hover:bg-[#1a0e0e] border-2 border-white/30 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed text-white font-akatab font-bold text-base sm:text-lg py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 uppercase tracking-wide"
            >
              <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>

        {/* Right Side - Map */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto overflow-hidden">
          {/* Pink overlay decoration */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
            style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(223, 117, 138, 0.15) 0%, transparent 50%)',
            }}
          />
          
          {/* Google Maps Embed - Hyderabad, India */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15227.123456789!2d78.4867!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="HydroHerbs Location - Hyderabad, India"
          />

          {/* Contact Info Overlay - Rounded Square Card */}
          <div className="absolute top-6 right-6 left-6 lg:left-auto lg:right-6 lg:top-6 z-20">
            <div className="inline-block p-5 sm:p-6 rounded-2xl border border-white/25 bg-white/16 backdrop-blur-sm shadow-lg max-w-xs">
              {/* Heading */}
              <h3 className="font-akatab font-bold text-lg sm:text-xl text-[#2A1515] mb-4">
                Contact Us
              </h3>
              
              {/* Phone */}
              <a
                href="tel:+918179892062"
                className="flex items-center gap-3 text-[#2A1515] hover:opacity-80 transition-opacity mb-4"
              >
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-[#2A1515]" />
                </div>
                <span className="font-akatab font-semibold text-sm sm:text-base">
                  +91 81798 92062
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:thehydroherbs@gmail.com"
                className="flex items-center gap-3 text-[#2A1515] hover:opacity-80 transition-opacity"
              >
                <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-[#2A1515]" />
                </div>
                <span className="font-akatab font-semibold text-sm sm:text-base break-all">
                  thehydroherbs@gmail.com
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
