export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      boards: {
        Row: {
          created_at: string
          description: string | null
          gear_type: Database["public"]["Enums"]["geartype"] | null
          gearType: Database["public"]["Enums"]["geartype"] | null
          h: number | null
          id: number
          img: string
          mfg: string
          name: string
          w: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          gear_type?: Database["public"]["Enums"]["geartype"] | null
          gearType?: Database["public"]["Enums"]["geartype"] | null
          h?: number | null
          id?: number
          img: string
          mfg: string
          name: string
          w?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          gear_type?: Database["public"]["Enums"]["geartype"] | null
          gearType?: Database["public"]["Enums"]["geartype"] | null
          h?: number | null
          id?: number
          img?: string
          mfg?: string
          name?: string
          w?: number | null
        }
        Relationships: []
      }
      pedals: {
        Row: {
          created_at: string
          description: string | null
          gear_type: Database["public"]["Enums"]["geartype"] | null
          h: number | null
          id: number
          img: string
          mfg: string
          name: string
          type: string[]
          w: number | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          gear_type?: Database["public"]["Enums"]["geartype"] | null
          h?: number | null
          id?: number
          img: string
          mfg: string
          name: string
          type: string[]
          w?: number | null
        }
        Update: {
          created_at?: string
          description?: string | null
          gear_type?: Database["public"]["Enums"]["geartype"] | null
          h?: number | null
          id?: number
          img?: string
          mfg?: string
          name?: string
          type?: string[]
          w?: number | null
        }
        Relationships: []
      }
      user_boards: {
        Row: {
          board: Json
          created_at: string
          id: number
          name: string | null
          snapshot: string | null
          user_id: string
        }
        Insert: {
          board: Json
          created_at?: string
          id?: number
          name?: string | null
          snapshot?: string | null
          user_id?: string
        }
        Update: {
          board?: Json
          created_at?: string
          id?: number
          name?: string | null
          snapshot?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_gear: {
        Row: {
          created_at: string
          gear: Json
          id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          gear: Json
          id?: number
          user_id?: string
        }
        Update: {
          created_at?: string
          gear?: Json
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      user_pedals: {
        Row: {
          created_at: string
          id: number
          notes: Json | null
          pedal_id: number
          title: string | null
          user_id: string
          user_title: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          notes?: Json | null
          pedal_id: number
          title?: string | null
          user_id?: string
          user_title?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          notes?: Json | null
          pedal_id?: number
          title?: string | null
          user_id?: string
          user_title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_pedals_pedal_id_fkey"
            columns: ["pedal_id"]
            isOneToOne: false
            referencedRelation: "pedals"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      geartype: "pedal" | "board"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      geartype: ["pedal", "board"],
    },
  },
} as const
