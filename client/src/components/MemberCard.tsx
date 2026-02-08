import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, GraduationCap, Calendar } from "lucide-react";

interface MemberCardProps {
  member: {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    yearOfAdmission: number;
    degreeProgram: string;
    rollNumber: string;
    department?: string | null;
    city: string;
    permanentAddress?: string | null;
    photoUrl?: string | null;
    bio?: string | null;
  };
}

export default function MemberCard({ member }: MemberCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
      {/* Header with photo */}
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
        {member.photoUrl ? (
          <img
            src={member.photoUrl}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/30 to-accent/30">
            <GraduationCap className="w-16 h-16 text-primary/40" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Name and Roll Number */}
        <h3 className="text-lg font-bold text-foreground mb-1">{member.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{member.rollNumber}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {member.degreeProgram}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {member.yearOfAdmission}
          </Badge>
        </div>

        {/* Bio */}
        {member.bio && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{member.bio}</p>
        )}

        {/* Information Grid */}
        <div className="space-y-2 text-sm mb-3 flex-1">
          {member.department && (
            <div className="flex items-start gap-2">
              <GraduationCap className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-muted-foreground">{member.department}</span>
            </div>
          )}

          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
            <span className="text-muted-foreground">{member.city}</span>
          </div>

          {member.email && (
            <div className="flex items-start gap-2">
              <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <a href={`mailto:${member.email}`} className="text-primary hover:underline truncate">
                {member.email}
              </a>
            </div>
          )}

          {member.phone && (
            <div className="flex items-start gap-2">
              <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <a href={`tel:${member.phone}`} className="text-primary hover:underline">
                {member.phone}
              </a>
            </div>
          )}
        </div>

        {/* Footer with year */}
        <div className="pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
          <Calendar className="w-3 h-3" />
          Admitted {member.yearOfAdmission}
        </div>
      </div>
    </Card>
  );
}
