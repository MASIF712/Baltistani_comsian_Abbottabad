import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import MemberCard from "@/components/MemberCard";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Search, X } from "lucide-react";

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [selectedDegree, setSelectedDegree] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");

  const { data: members, isLoading } = trpc.members.list.useQuery({
    searchTerm: searchTerm || undefined,
    yearOfAdmission: selectedYear ? parseInt(selectedYear) : undefined,
    degreeProgram: selectedDegree || undefined,
    city: selectedCity || undefined,
  });

  const { data: filterOptions } = trpc.members.getFilterOptions.useQuery();

  const hasFilters = searchTerm || selectedYear || selectedDegree || selectedCity;

  const handleClearFilters = (): void => {
    setSearchTerm("");
    setSelectedYear("");
    setSelectedDegree("");
    setSelectedCity("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-2">Member Directory</h1>
          <p className="text-muted-foreground text-lg">
            Connect with Baltistan Comsians from COMSATS University Abbottabad
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year of Admission" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions?.years.map((year) => (
                  <SelectItem key={year} value={String(year)}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDegree} onValueChange={setSelectedDegree}>
              <SelectTrigger>
                <SelectValue placeholder="Degree Program" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions?.degrees.map((degree) => (
                  <SelectItem key={degree} value={degree}>
                    {degree}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger>
                <SelectValue placeholder="City/Region" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions?.cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {hasFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Results Count */}
        {!isLoading && members && (
          <div className="mb-6 text-sm text-muted-foreground">
            Found {members.length} member{members.length !== 1 ? "s" : ""}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Empty State */}
        {!isLoading && (!members || members.length === 0) && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No members found matching your search.</p>
            {hasFilters && (
              <Button
                variant="outline"
                onClick={handleClearFilters}
                className="mt-4"
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}

        {/* Members Grid */}
        {!isLoading && members && members.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
