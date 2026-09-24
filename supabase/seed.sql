-- ZEN CAPITAL OS — Mock Production Seed Records

INSERT INTO public.portfolio_holdings (id, ticker, name, roic, fcf_yield, debt_equity, gross_margin, fcf_margin, moat, category, allocation_usd, weight_percent) VALUES
('c1010000-0000-0000-0000-000000000001', 'MSFT', 'Microsoft Corporation', 32.40, 3.80, 0.28, 69.80, 31.20, 'Wide Platform Moat', 'Retirement', 3800000.00, 26.80),
('c1010000-0000-0000-0000-000000000002', 'GOOGL', 'Alphabet Inc', 28.10, 4.20, 0.05, 57.50, 27.80, 'Wide Network Effect', 'Retirement', 3100000.00, 21.80),
('c1010000-0000-0000-0000-000000000003', 'ASML', 'ASML Holding NV', 44.80, 2.90, 0.32, 51.20, 24.50, 'Monopoly EUV Lithography', 'Speculative', 2750000.00, 19.40),
('c1010000-0000-0000-0000-000000000004', 'V', 'Visa Inc', 48.20, 3.60, 0.54, 97.40, 58.10, 'Duopoly Global Payment Rail', 'Income', 2450000.00, 17.30),
('c1010000-0000-0000-0000-000000000005', 'NVDA', 'Nvidia Corporation', 62.50, 3.10, 0.18, 75.10, 45.80, 'Accelerated Compute Moat', 'Speculative', 2100000.00, 14.70);

INSERT INTO public.fcf_valuation_models (holding_id, wacc, terminal_growth_rate, intrinsic_value_usd, current_price_usd, margin_of_safety_percent, status) VALUES
('c1010000-0000-0000-0000-000000000001', 8.50, 3.00, 510.00, 428.50, 19.00, 'undervalued'),
('c1010000-0000-0000-0000-000000000002', 8.00, 2.50, 215.00, 178.20, 20.60, 'undervalued'),
('c1010000-0000-0000-0000-000000000003', 9.00, 3.00, 1050.00, 890.00, 17.90, 'undervalued');

INSERT INTO public.lp_capital_calls (mandate_name, lp_name, committed_usd, called_usd, uncalled_usd, net_irr, vintage_year, status) VALUES
('Vanguard Alpha Fund I', 'Sovereign Heritage Trust', 20000000.00, 5000000.00, 15000000.00, 24.80, 2026, 'active'),
('High ROIC Compounders LP', 'Genevieve Sterling Office', 10000000.00, 3500000.00, 6500000.00, 28.20, 2026, 'active');
