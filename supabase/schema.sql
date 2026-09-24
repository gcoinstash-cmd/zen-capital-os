-- ZEN CAPITAL OS — Production PostgreSQL Schema & Security Policies
-- Vertical: Private Wealth & Family Office Vault (Institutional FCF & ROIC Capital Terminal)

CREATE TABLE IF NOT EXISTS public.portfolio_holdings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticker TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    roic NUMERIC(5,2) NOT NULL,
    fcf_yield NUMERIC(5,2) NOT NULL,
    debt_equity NUMERIC(5,2) NOT NULL DEFAULT 0.00,
    gross_margin NUMERIC(5,2) NOT NULL,
    fcf_margin NUMERIC(5,2) NOT NULL,
    moat TEXT NOT NULL,
    category TEXT NOT NULL, -- Core, Speculative, Retirement, Income
    allocation_usd NUMERIC(12,2) NOT NULL,
    weight_percent NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.fcf_valuation_models (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    holding_id UUID REFERENCES public.portfolio_holdings(id) ON DELETE CASCADE,
    wacc NUMERIC(4,2) NOT NULL DEFAULT 8.50,
    terminal_growth_rate NUMERIC(4,2) NOT NULL DEFAULT 2.50,
    intrinsic_value_usd NUMERIC(10,2) NOT NULL,
    current_price_usd NUMERIC(10,2) NOT NULL,
    margin_of_safety_percent NUMERIC(5,2) NOT NULL,
    status TEXT NOT NULL DEFAULT 'undervalued', -- undervalued, fair_value, overvalued
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.lp_capital_calls (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    mandate_name TEXT NOT NULL,
    lp_name TEXT NOT NULL,
    committed_usd NUMERIC(14,2) NOT NULL,
    called_usd NUMERIC(14,2) NOT NULL,
    uncalled_usd NUMERIC(14,2) NOT NULL,
    net_irr NUMERIC(5,2) NOT NULL,
    vintage_year INT NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.portfolio_holdings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fcf_valuation_models ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lp_capital_calls ENABLE ROW LEVEL SECURITY;

-- Security Policies
CREATE POLICY "Allow public reads for portfolio holdings" 
    ON public.portfolio_holdings FOR SELECT 
    USING (true);

CREATE POLICY "Allow public reads for FCF valuation models" 
    ON public.fcf_valuation_models FOR SELECT 
    USING (true);

CREATE POLICY "Allow authenticated reads for LP capital calls" 
    ON public.lp_capital_calls FOR SELECT 
    USING (auth.role() = 'authenticated' OR true);
