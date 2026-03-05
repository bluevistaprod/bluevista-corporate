import { useState } from "react";
import { useI18n } from "@/hooks/useI18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Contact() {
  const { language, domain, isLoaded, t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    type: "contact" as "contact" | "devis",
  });

  const submitMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      toast.success(t("contact.form_success"));
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        subject: "",
        message: "",
        type: "contact",
      });
    },
    onError: () => {
      toast.error(t("contact.form_error"));
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate({
      ...formData,
      domain: domain as "com" | "ch",
    });
  };

  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">{t("contact.title")}</h1>
          <p className="text-xl text-gray-300">
            Nous sommes à votre écoute pour discuter de votre projet
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Envoyez-nous un message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form_name")}
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form_email")}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form_phone")}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+33 1 23 45 67 89"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t("contact.form_company")}
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre entreprise"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type de demande
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="contact">Demande d'information</option>
                    <option value="devis">Demande de devis</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form_subject")}
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Sujet de votre demande"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t("contact.form_message")}
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez votre projet..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {submitMutation.isPending ? "Envoi en cours..." : t("contact.form_submit")}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-gray-900">Nos coordonnées</h2>

              <div className="space-y-8">
                {/* Lyon */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Lyon (Siège social)</h3>
                  <p className="text-gray-600 mb-1">8 rue Jean Élysée Dupuy</p>
                  <p className="text-gray-600 mb-1">69410 Champagne-au-Mont-d'Or</p>
                  <p className="text-gray-600 font-medium">+33 (0)4 72 34 51 89</p>
                </div>

                {/* Paris */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Paris</h3>
                  <p className="text-gray-600 mb-1">92 Avenue Victor Hugo</p>
                  <p className="text-gray-600 mb-1">92100 Boulogne-Billancourt</p>
                  <p className="text-gray-600 font-medium">+33 (0)1 83 64 58 96</p>
                </div>

                {/* Genève */}
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Genève</h3>
                  <p className="text-gray-600 mb-1">Bd Georges-Favon 43</p>
                  <p className="text-gray-600 mb-1">1204 Genève, Suisse</p>
                  <p className="text-gray-600 font-medium">+41 (0)22 519 28 48</p>
                </div>

                {/* Email */}
                <div className="pt-8 border-t border-gray-200">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">Email</h3>
                  <a
                    href="mailto:contact@bluevista.com"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    contact@bluevista.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
