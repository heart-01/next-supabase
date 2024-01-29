"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export const register = async (formData: FormData) => {
  const fullname = formData.get("fullname");
  const email = formData.get("email");
  const tel = formData.get("tel");
  const attachment = formData.get("attachment") as File;
  const fileName = `${uuidv4()}.${attachment.name.split(".").pop()}`;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data: uploadSuccess, error: uploadError } = await supabase.storage.from("attachments").upload(fileName, attachment);

  if (uploadError) {
    console.error("🚀 ~ register ~ uploadError", uploadError);
    return;
  }

  const { data: publicAttachmentUrl } = supabase.storage.from("attachments").getPublicUrl(fileName);

  const { error: insertError } = await supabase.from("users").insert([{ fullname, email, tel, attachment: publicAttachmentUrl.publicUrl }]);

  if (insertError) {
    console.log("🚀 ~ register ~ insertError:", insertError);
    return;
  }
};
