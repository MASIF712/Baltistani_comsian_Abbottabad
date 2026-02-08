import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const memberFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
  yearOfAdmission: z.coerce.number().min(1900).max(new Date().getFullYear()),
  degreeProgram: z.string().min(1, "Degree program is required"),
  rollNumber: z.string().min(1, "Roll number is required"),
  department: z.string().optional().or(z.literal("")),
  city: z.string().min(1, "City is required"),
  permanentAddress: z.string().optional().or(z.literal("")),
  photoUrl: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
});

type MemberFormValues = z.infer<typeof memberFormSchema>;

interface MemberFormProps {
  initialData?: any;
  onSuccess?: () => void;
}

export default function MemberForm({ initialData, onSuccess }: MemberFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const utils = trpc.useUtils();

  const form = useForm({
    resolver: zodResolver(memberFormSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      phone: "",
      yearOfAdmission: new Date().getFullYear(),
      degreeProgram: "BS",
      rollNumber: "",
      department: "",
      city: "",
      permanentAddress: "",
      photoUrl: "",
      bio: "",
    },
  });

  const createMutation = trpc.members.create.useMutation();
  const updateMutation = trpc.members.update.useMutation();

  const onSubmit = async (values: MemberFormValues) => {
    try {
      setIsLoading(true);

      if (initialData?.id) {
        // Update existing member
        await updateMutation.mutateAsync({
          id: initialData.id,
          data: {
            ...values,
            email: values.email || null,
            phone: values.phone || null,
            department: values.department || null,
            permanentAddress: values.permanentAddress || null,
            photoUrl: values.photoUrl || null,
            bio: values.bio || null,
          },
        });
      } else {
        // Create new member
        await createMutation.mutateAsync({
          ...values,
          email: values.email || null,
          phone: values.phone || null,
          department: values.department || null,
          permanentAddress: values.permanentAddress || null,
          photoUrl: values.photoUrl || null,
          bio: values.bio || null,
        });
      }

      // Invalidate the members list to refresh it
      await utils.members.list.invalidate();

      onSuccess?.();
    } catch (error: any) {
      toast.error(error.message || "Failed to save member");
    } finally {
      setIsLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="rollNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roll Number *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., 21-CS-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="+92 300 1234567" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="yearOfAdmission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year of Admission *</FormLabel>
                <Select value={String(field.value)} onValueChange={(value) => field.onChange(parseInt(value))}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={String(year)}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="degreeProgram"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Degree Program *</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BS">BS (Bachelor of Science)</SelectItem>
                    <SelectItem value="MS">MS (Master of Science)</SelectItem>
                    <SelectItem value="PhD">PhD (Doctor of Philosophy)</SelectItem>
                    <SelectItem value="BBA">BBA (Bachelor of Business Administration)</SelectItem>
                    <SelectItem value="MBA">MBA (Master of Business Administration)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="department"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Computer Science" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City/Region *</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Skardu, Khaplu" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="permanentAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Permanent Address</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter full permanent address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="photoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Photo URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/photo.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Brief bio or description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-2 pt-4">
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {initialData ? "Update Member" : "Add Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
