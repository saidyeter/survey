"use client"

import { create } from "@/actions/partipiciant";
import { TNewParticipantSchema, newParticipantSchema, participantSchema } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function CreateForm() {
  const form = useForm<TNewParticipantSchema>({
    resolver: zodResolver(newParticipantSchema),
    defaultValues: {
      city: '',
      code: '',
      email: '',
      pType: 'Eczane',
      status: 'Aktif',
      subcity: '',
      title: '',
    },
  });

  async function formSubmit(data: TNewParticipantSchema) {
    const result = await create(data)
    if (result && !result.success) {
      //poroblem
    }

  };

  console.log(form.formState.errors)
  return (
    <div className="pt-4 w-full lg:w-[640px] lg:m-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(formSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unvan</FormLabel>
                <FormControl>
                  <Input placeholder="Unvan" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eczane Kodu</FormLabel>
                <FormControl>
                  <Input placeholder="Eczane Kodu" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E Mail</FormLabel>
                <FormControl>
                  <Input placeholder="E Mail" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Şehir</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Şehir seçin" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[var(--radix-select-content-available-height)]">
                    <SelectItem value='Adana'>Adana</SelectItem>
                    <SelectItem value='Adıyaman'>Adıyaman</SelectItem>
                    <SelectItem value='Afyonkarahisar'>Afyonkarahisar</SelectItem>
                    <SelectItem value='Ağrı'>Ağrı</SelectItem>
                    <SelectItem value='Aksaray'>Aksaray</SelectItem>
                    <SelectItem value='Amasya'>Amasya</SelectItem>
                    <SelectItem value='Ankara'>Ankara</SelectItem>
                    <SelectItem value='Antalya'>Antalya</SelectItem>
                    <SelectItem value='Ardahan'>Ardahan</SelectItem>
                    <SelectItem value='Artvin'>Artvin</SelectItem>
                    <SelectItem value='Aydın'>Aydın</SelectItem>
                    <SelectItem value='Balıkesir'>Balıkesir</SelectItem>
                    <SelectItem value='Bartın'>Bartın</SelectItem>
                    <SelectItem value='Batman'>Batman</SelectItem>
                    <SelectItem value='Bayburt'>Bayburt</SelectItem>
                    <SelectItem value='Bilecik'>Bilecik</SelectItem>
                    <SelectItem value='Bingöl'>Bingöl</SelectItem>
                    <SelectItem value='Bitlis'>Bitlis</SelectItem>
                    <SelectItem value='Bolu'>Bolu</SelectItem>
                    <SelectItem value='Burdur'>Burdur</SelectItem>
                    <SelectItem value='Bursa'>Bursa</SelectItem>
                    <SelectItem value='Çanakkale'>Çanakkale</SelectItem>
                    <SelectItem value='Çankırı'>Çankırı</SelectItem>
                    <SelectItem value='Çorum'>Çorum</SelectItem>
                    <SelectItem value='Denizli'>Denizli</SelectItem>
                    <SelectItem value='Diyarbakır'>Diyarbakır</SelectItem>
                    <SelectItem value='Düzce'>Düzce</SelectItem>
                    <SelectItem value='Edirne'>Edirne</SelectItem>
                    <SelectItem value='Elazığ'>Elazığ</SelectItem>
                    <SelectItem value='Erzincan'>Erzincan</SelectItem>
                    <SelectItem value='Erzurum'>Erzurum</SelectItem>
                    <SelectItem value='Eskişehir'>Eskişehir</SelectItem>
                    <SelectItem value='Gaziantep'>Gaziantep</SelectItem>
                    <SelectItem value='Giresun'>Giresun</SelectItem>
                    <SelectItem value='Gümüşhane'>Gümüşhane</SelectItem>
                    <SelectItem value='Hakkari'>Hakkari</SelectItem>
                    <SelectItem value='Hatay'>Hatay</SelectItem>
                    <SelectItem value='Iğdır'>Iğdır</SelectItem>
                    <SelectItem value='Isparta'>Isparta</SelectItem>
                    <SelectItem value='İstanbul'>İstanbul</SelectItem>
                    <SelectItem value='İzmir'>İzmir</SelectItem>
                    <SelectItem value='Kahramanmaraş'>Kahramanmaraş</SelectItem>
                    <SelectItem value='Karabük'>Karabük</SelectItem>
                    <SelectItem value='Karaman'>Karaman</SelectItem>
                    <SelectItem value='Kars'>Kars</SelectItem>
                    <SelectItem value='Kastamonu'>Kastamonu</SelectItem>
                    <SelectItem value='Kayseri'>Kayseri</SelectItem>
                    <SelectItem value='Kırıkkale'>Kırıkkale</SelectItem>
                    <SelectItem value='Kırklareli'>Kırklareli</SelectItem>
                    <SelectItem value='Kırşehir'>Kırşehir</SelectItem>
                    <SelectItem value='Kilis'>Kilis</SelectItem>
                    <SelectItem value='Kocaeli'>Kocaeli</SelectItem>
                    <SelectItem value='Konya'>Konya</SelectItem>
                    <SelectItem value='Kütahya'>Kütahya</SelectItem>
                    <SelectItem value='Malatya'>Malatya</SelectItem>
                    <SelectItem value='Manisa'>Manisa</SelectItem>
                    <SelectItem value='Mardin'>Mardin</SelectItem>
                    <SelectItem value='Mersin'>Mersin</SelectItem>
                    <SelectItem value='Muğla'>Muğla</SelectItem>
                    <SelectItem value='Muş'>Muş</SelectItem>
                    <SelectItem value='Nevşehir'>Nevşehir</SelectItem>
                    <SelectItem value='Niğde'>Niğde</SelectItem>
                    <SelectItem value='Ordu'>Ordu</SelectItem>
                    <SelectItem value='Osmaniye'>Osmaniye</SelectItem>
                    <SelectItem value='Rize'>Rize</SelectItem>
                    <SelectItem value='Sakarya'>Sakarya</SelectItem>
                    <SelectItem value='Samsun'>Samsun</SelectItem>
                    <SelectItem value='Siirt'>Siirt</SelectItem>
                    <SelectItem value='Sinop'>Sinop</SelectItem>
                    <SelectItem value='Sivas'>Sivas</SelectItem>
                    <SelectItem value='Şanlıurfa'>Şanlıurfa</SelectItem>
                    <SelectItem value='Şırnak'>Şırnak</SelectItem>
                    <SelectItem value='Tekirdağ'>Tekirdağ</SelectItem>
                    <SelectItem value='Tokat'>Tokat</SelectItem>
                    <SelectItem value='Trabzon'>Trabzon</SelectItem>
                    <SelectItem value='Tunceli'>Tunceli</SelectItem>
                    <SelectItem value='Uşak'>Uşak</SelectItem>
                    <SelectItem value='Van'>Van</SelectItem>
                    <SelectItem value='Yalova'>Yalova</SelectItem>
                    <SelectItem value='Yozgat'>Yozgat</SelectItem>
                    <SelectItem value='Zonguldak'>Zonguldak</SelectItem>
                    {/* <SelectItem t="light">Light</SelectItem>
                    <SelectItem value">dark">Dark</SelectItem>
                    <SelectItem em="system">System</SelectItem> */}
                  </SelectContent>
                </Select>

                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subcity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>İlçe</FormLabel>
                <FormControl>
                  <Input placeholder="İlçe" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Yeni ekle</Button>
        </form>
      </Form>
    </div>
  )
}