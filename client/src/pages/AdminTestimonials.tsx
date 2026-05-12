import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Eye, Trash2, Star } from "lucide-react";

type Language = 'fr' | 'en';

type TestimonialStatus = "pending" | "approved" | "published" | "rejected";

interface Testimonial {
  id: number;
  clientName: string;
  clientTitle: string | null;
  clientCompany: string;
  clientEmail: string;
  sector: "communication" | "events" | "immersion";
  projectType: string;
  problem: string;
  solution: string;
  result: string;
  rating: number;
  status: TestimonialStatus;
  featured: number;
  allowWebsite: number;
  allowGoogle: number;
  allowTrustpilot: number;
  allowSocial: number;
  createdAt: Date;
}

export default function AdminTestimonials() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState<Language>('fr');
  const [activeTab, setActiveTab] = useState<TestimonialStatus>("pending");

  // Fetch testimonials by status
  const { data: testimonials = [], isLoading, refetch } = trpc.testimonials.getAllAdmin.useQuery({
    status: activeTab,
  });

  const approveMutation = trpc.testimonials.approve.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const rejectMutation = trpc.testimonials.reject.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  const handleApprove = (id: number) => {
    approveMutation.mutate({ id });
  };

  const handleReject = (id: number) => {
    rejectMutation.mutate({ id });
  };

  const getSectorColor = (sector: string) => {
    switch (sector) {
      case "communication":
        return "bg-blue-100 text-blue-800";
      case "events":
        return "bg-purple-100 text-purple-800";
      case "immersion":
        return "bg-cyan-100 text-cyan-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: TestimonialStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "published":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Note: Protection admin gérée via AdminLogin page

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {language === "fr" ? "Modération des Témoignages" : "Testimonials Moderation"}
          </h1>
          <p className="text-gray-600">
            {language === "fr"
              ? "Gérez et approuvez les témoignages clients"
              : "Manage and approve client testimonials"}
          </p>
          <div className="mt-4 flex gap-2">
            <Button
              variant={language === 'fr' ? 'default' : 'outline'}
              onClick={() => setLanguage('fr')}
            >
              FR
            </Button>
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              onClick={() => setLanguage('en')}
            >
              EN
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TestimonialStatus)}>
          <TabsList className="mb-6">
            <TabsTrigger value="pending">
              {language === "fr" ? "En attente" : "Pending"}
            </TabsTrigger>
            <TabsTrigger value="approved">
              {language === "fr" ? "Approuvés" : "Approved"}
            </TabsTrigger>
            <TabsTrigger value="published">
              {language === "fr" ? "Publiés" : "Published"}
            </TabsTrigger>
            <TabsTrigger value="rejected">
              {language === "fr" ? "Rejetés" : "Rejected"}
            </TabsTrigger>
          </TabsList>

          {/* Testimonials List */}
          <TabsContent value={activeTab} className="space-y-4">
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  {language === "fr" ? "Chargement..." : "Loading..."}
                </p>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  {language === "fr"
                    ? "Aucun témoignage dans cette catégorie"
                    : "No testimonials in this category"}
                </p>
              </div>
            ) : (
              testimonials.map((testimonial: Testimonial) => (
                <Card key={testimonial.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg">
                            {testimonial.clientName}
                          </CardTitle>
                          {testimonial.featured === 1 && (
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <CardDescription>
                          {testimonial.clientTitle && `${testimonial.clientTitle} • `}
                          {testimonial.clientCompany}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={getSectorColor(testimonial.sector)}>
                          {testimonial.sector}
                        </Badge>
                        <Badge className={getStatusColor(testimonial.status)}>
                          {testimonial.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Project Info */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {language === "fr" ? "Type de projet" : "Project Type"}
                      </p>
                      <p className="text-sm text-gray-600">{testimonial.projectType}</p>
                    </div>

                    {/* Problem */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {language === "fr" ? "Problème" : "Problem"}
                      </p>
                      <p className="text-sm text-gray-600">{testimonial.problem}</p>
                    </div>

                    {/* Solution */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {language === "fr" ? "Solution" : "Solution"}
                      </p>
                      <p className="text-sm text-gray-600">{testimonial.solution}</p>
                    </div>

                    {/* Result */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {language === "fr" ? "Résultat" : "Result"}
                      </p>
                      <p className="text-sm text-gray-600">{testimonial.result}</p>
                    </div>

                    {/* Rating */}
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-1">
                        {language === "fr" ? "Note" : "Rating"}
                      </p>
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <span key={i} className="text-yellow-400">
                            ★
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Permissions */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={testimonial.allowWebsite === 1}
                          disabled
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">
                          {language === "fr" ? "Site Web" : "Website"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={testimonial.allowGoogle === 1}
                          disabled
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">Google</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={testimonial.allowTrustpilot === 1}
                          disabled
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">Trustpilot</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={testimonial.allowSocial === 1}
                          disabled
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-gray-600">
                          {language === "fr" ? "Réseaux sociaux" : "Social Media"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-4 border-t">
                      {activeTab === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => handleApprove(testimonial.id)}
                            disabled={approveMutation.isPending}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            {language === "fr" ? "Approuver" : "Approve"}
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleReject(testimonial.id)}
                            disabled={rejectMutation.isPending}
                            className="flex items-center gap-2"
                          >
                            <XCircle className="w-4 h-4" />
                            {language === "fr" ? "Rejeter" : "Reject"}
                          </Button>
                        </>
                      )}
                      {activeTab === "approved" && (
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApprove(testimonial.id)}
                          disabled={approveMutation.isPending}
                          className="flex items-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          {language === "fr" ? "Publier" : "Publish"}
                        </Button>
                      )}
                      {activeTab === "published" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(testimonial.id)}
                          disabled={rejectMutation.isPending}
                          className="flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" />
                          {language === "fr" ? "Dépublier" : "Unpublish"}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
