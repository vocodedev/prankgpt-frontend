import { Session } from "@supabase/supabase-js";
import React from "react";

export type SessionContextType = {
  session: Session | null;
};

const defaultSessionContext: SessionContextType = {
  session: null,
};

export const SessionContext = React.createContext(defaultSessionContext);
