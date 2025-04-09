
import React, { useState } from "react";
import { siteData } from "../data/siteData";
import { useToast } from "@/hooks/use-toast";

const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent",
        description: "We'll get back to you as soon as possible.",
      });
      
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm uppercase tracking-wider mb-2">
          {siteData.contact.form.name}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-300 focus:border-black py-2 px-0 bg-transparent outline-none transition-colors"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm uppercase tracking-wider mb-2">
          {siteData.contact.form.email}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-300 focus:border-black py-2 px-0 bg-transparent outline-none transition-colors"
        />
      </div>
      
      <div>
        <label htmlFor="phone" className="block text-sm uppercase tracking-wider mb-2">
          {siteData.contact.form.phone}
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border-b border-gray-300 focus:border-black py-2 px-0 bg-transparent outline-none transition-colors"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm uppercase tracking-wider mb-2">
          {siteData.contact.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-300 focus:border-black py-2 px-0 bg-transparent outline-none transition-colors resize-none"
        />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-8 py-3 text-sm uppercase tracking-wider hover:bg-gray-800 transition-colors disabled:bg-gray-400"
        >
          {isSubmitting ? "Sending..." : siteData.contact.form.submit}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
