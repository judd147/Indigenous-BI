"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "~/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { updateProfile } from "~/server/db/actions";

// Define schema for form validation
export const formSchema = z.object({
  companyName: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." }),
  address: z.string().min(1, { message: "Address is required." }),
  city: z.string().min(1, { message: "City is required." }),
  province: z.string().min(1, { message: "Province is required." }),
  postalCode: z.string().min(1, { message: "Postal Code is required." }),
  phone: z.string().optional(),
  website: z.string().optional(),
  businessType: z.string().min(1, { message: "Business Type is required." }),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      website: "",
      businessType: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(updateProfile)} className="space-y-8">
        <h1 className="text-2xl font-bold"></h1>
        
        {/* Username Field */}
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name *</FormLabel>
              <FormControl>
                <Input placeholder="Company Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address *</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* City Field */}
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Province Selection */}
        <FormField
          control={form.control}
          name="province"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Province *</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alberta">Alberta</SelectItem>
                    <SelectItem value="British Columbia">
                      British Columbia
                    </SelectItem>
                    <SelectItem value="Manitoba">Manitoba</SelectItem>
                    <SelectItem value="New Brunswick">New Brunswick</SelectItem>
                    <SelectItem value="Newfoundland and Labrador">
                      Newfoundland and Labrador
                    </SelectItem>
                    <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
                    <SelectItem value="Ontario">Ontario</SelectItem>
                    <SelectItem value="Prince Edward Island">
                      Prince Edward Island
                    </SelectItem>
                    <SelectItem value="Quebec">Quebec</SelectItem>
                    <SelectItem value="Saskatchewan">Saskatchewan</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Postal Code Field */}
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code *</FormLabel>
              <FormControl>
                <Input placeholder="Postal Code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Field */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Website Field */}
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input placeholder="Website" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Business Type Field */}
        <FormField
          control={form.control}
          name="businessType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Type *</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Business Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Accommodation Services">
                      Accommodation Services
                    </SelectItem>
                    <SelectItem value="Accounting / Payroll">
                      Accounting / Payroll
                    </SelectItem>
                    <SelectItem value="Administrative and Support">
                      Administrative and Support
                    </SelectItem>
                    <SelectItem value="Advertising / Public Relations">
                      Advertising / Public Relations
                    </SelectItem>
                    <SelectItem value="Agriculture">Agriculture</SelectItem>
                    <SelectItem value="Aquaculture">Aquaculture</SelectItem>
                    <SelectItem value="Architecture/Engineering">
                      Architecture/Engineering
                    </SelectItem>
                    <SelectItem value="Arts / Entertainment">
                      Arts / Entertainment
                    </SelectItem>
                    <SelectItem value="Charitable / Non-Profit Organization">
                      Charitable / Non-Profit Organization
                    </SelectItem>
                    <SelectItem value="Computer Programming/Website Services">
                      Computer Programming/Website Services
                    </SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Consulting">Consulting</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Employment / Training">
                      Employment / Training
                    </SelectItem>
                    <SelectItem value="Energy Generation &amp; Transmission">
                      Energy Generation &amp; Transmission
                    </SelectItem>
                    <SelectItem value="Finance / Banking">
                      Finance / Banking
                    </SelectItem>
                    <SelectItem value="Fisheries">Fisheries</SelectItem>
                    <SelectItem value="Food and Beverage Services">
                      Food and Beverage Services
                    </SelectItem>
                    <SelectItem value="Forestry">Forestry</SelectItem>
                    <SelectItem value="Health Care">Health Care</SelectItem>
                    <SelectItem value="Heritage Institutions">
                      Heritage Institutions
                    </SelectItem>
                    <SelectItem value="Indigenous Economic Development Corporation">
                      Indigenous Economic Development Corporation
                    </SelectItem>
                    <SelectItem value="Indigenous Governments">
                      Indigenous Governments
                    </SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="Law">Law</SelectItem>
                    <SelectItem value="Logistics">Logistics</SelectItem>
                    <SelectItem value="Management of Companies and Enterprises">
                      Management of Companies and Enterprises
                    </SelectItem>
                    <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="Media / Communications">
                      Media / Communications
                    </SelectItem>
                    <SelectItem value="Mining">Mining</SelectItem>
                    <SelectItem value="Oil &amp; Gas">Oil &amp; Gas</SelectItem>
                    <SelectItem value="Personal and Beauty Care Services">
                      Personal and Beauty Care Services
                    </SelectItem>
                    <SelectItem value="Professional Services">
                      Professional Services
                    </SelectItem>
                    <SelectItem value="Property Management">
                      Property Management
                    </SelectItem>
                    <SelectItem value="Public Administration">
                      Public Administration
                    </SelectItem>
                    <SelectItem value="Real Estate">Real Estate</SelectItem>
                    <SelectItem value="Remediation Services">
                      Remediation Services
                    </SelectItem>
                    <SelectItem value="Rental and Leasing">
                      Rental and Leasing
                    </SelectItem>
                    <SelectItem value="Repair and Maintenance">
                      Repair and Maintenance
                    </SelectItem>
                    <SelectItem value="Retail">Retail</SelectItem>
                    <SelectItem value="Science &amp; Research">
                      Science &amp; Research
                    </SelectItem>
                    <SelectItem value="Social Assistance">
                      Social Assistance
                    </SelectItem>
                    <SelectItem value="Specialized Design">
                      Specialized Design
                    </SelectItem>
                    <SelectItem value="Sport Recreation &amp; Gambling">
                      Sport Recreation &amp; Gambling
                    </SelectItem>
                    <SelectItem value="Telecommunications">
                      Telecommunications
                    </SelectItem>
                    <SelectItem value="Tourism">Tourism</SelectItem>
                    <SelectItem value="Transportation (air, rail, water, truck)">
                      Transportation (air, rail, water, truck)
                    </SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Warehousing">Warehousing</SelectItem>
                    <SelectItem value="Waste Management">
                      Waste Management
                    </SelectItem>
                    <SelectItem value="Wholesale Trade">
                      Wholesale Trade
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Social Media Links Section */}
        <div>
          <h2 className="text-lg font-semibold">Social Media Links</h2>
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>LinkedIn</FormLabel>
                  <FormControl>
                    <Input placeholder="LinkedIn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input placeholder="Facebook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Twitter</FormLabel>
                  <FormControl>
                    <Input placeholder="Twitter" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Instagram</FormLabel>
                  <FormControl>
                    <Input placeholder="Instagram" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="youtube"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>YouTube</FormLabel>
                  <FormControl>
                    <Input placeholder="YouTube" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
