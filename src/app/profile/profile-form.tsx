"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "~/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
 
// Define schema for form validation
const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  address: z.string().min(1, { message: "Address is required." }),
  suite: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  province: z.string().min(1, { message: "Province is required." }),
  postalCode: z.string().min(1, { message: "Postal Code is required." }),
  phone: z.string().optional(),
  email: z.string().email({ message: "Invalid email address." }),
  website: z.string().optional(),
  businessType: z.string().min(1, { message: "Business Type is required." }),
  linkedin: z.string().optional(),
  facebook: z.string().optional(),
  twitter: z.string().optional(),
  instagram: z.string().optional(),
  youtube: z.string().optional(),
})
 
export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      address: "",
      suite: "",
      city: "",
      province: "",
      postalCode: "",
      phone: "",
      email: "",
      website: "",
      businessType: "",
      linkedin: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1 className="text-2xl font-bold"></h1>
        
        {/* Username Field */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
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
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
 
        {/* Suite Field */}
        <FormField
          control={form.control}
          name="suite"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suite</FormLabel>
              <FormControl>
                <Input placeholder="Suite" {...field} />
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
              <FormLabel>City</FormLabel>
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
              <FormLabel>Province</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Province" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alberta">Alberta</SelectItem>
                    <SelectItem value="British Columbia">British Columbia</SelectItem>
                    <SelectItem value="Manitoba">Manitoba</SelectItem>
                    <SelectItem value="New Brunswick">New Brunswick</SelectItem>
                    <SelectItem value="Newfoundland and Labrador">Newfoundland and Labrador</SelectItem>
                    <SelectItem value="Nova Scotia">Nova Scotia</SelectItem>
                    <SelectItem value="Ontario">Ontario</SelectItem>
                    <SelectItem value="Prince Edward Island">Prince Edward Island</SelectItem>
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
              <FormLabel>Postal Code</FormLabel>
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
 
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
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
              <FormLabel>Business Type</FormLabel>
              <FormControl>
                <Input placeholder="Select Business Type" {...field} />
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
  )
}