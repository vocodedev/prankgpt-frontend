import { Session } from "@supabase/supabase-js";
import React from "react";
import { SessionContext } from "../helpers/SessionContext";
import { supabase } from "../services/supabase";
import { SessionContextType } from "../helpers/SessionContext";
import { useToast } from "@chakra-ui/react";

const SessionProvider = (props: any) => {
  const [session, setSession] = React.useState<Session | null>(null);
  const toast = useToast();

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user.phone) {
        toast({
          description: "Logged in as +" + session?.user?.phone,
          status: "success",
          duration: 9000,
          isClosable: true,
        });
      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <SessionContext.Provider value={{ session }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
