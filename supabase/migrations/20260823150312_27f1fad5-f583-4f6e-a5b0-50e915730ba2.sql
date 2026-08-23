
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  age INTEGER,
  gender TEXT,
  state TEXT,
  district TEXT,
  area_type TEXT,
  education TEXT,
  occupation TEXT,
  income_range TEXT,
  preferences JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON public.profiles FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE public.schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  scheme_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  government_level TEXT NOT NULL DEFAULT 'Central',
  state TEXT,
  benefits TEXT[] NOT NULL DEFAULT '{}',
  eligibility_criteria TEXT[] NOT NULL DEFAULT '{}',
  required_documents TEXT[] NOT NULL DEFAULT '{}',
  application_process TEXT[] NOT NULL DEFAULT '{}',
  target_users TEXT[] NOT NULL DEFAULT '{}',
  official_url TEXT,
  application_url TEXT,
  deadline DATE,
  last_updated DATE NOT NULL DEFAULT current_date,
  verification_status TEXT NOT NULL DEFAULT 'demo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.schemes TO anon;
GRANT SELECT ON public.schemes TO authenticated;
GRANT ALL ON public.schemes TO service_role;
ALTER TABLE public.schemes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Schemes are public" ON public.schemes FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.saved_schemes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  scheme_id UUID NOT NULL REFERENCES public.schemes ON DELETE CASCADE,
  saved_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, scheme_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.saved_schemes TO authenticated;
GRANT ALL ON public.saved_schemes TO service_role;
ALTER TABLE public.saved_schemes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own saved schemes" ON public.saved_schemes FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE TABLE public.eligibility_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  scheme_id UUID NOT NULL REFERENCES public.schemes ON DELETE CASCADE,
  match_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.eligibility_results TO authenticated;
GRANT ALL ON public.eligibility_results TO service_role;
ALTER TABLE public.eligibility_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own eligibility results" ON public.eligibility_results FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE OR REPLACE FUNCTION public.handle_new_user() RETURNS TRIGGER
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'), NEW.email)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END; $$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

INSERT INTO public.schemes (scheme_name, slug, description, category, government_level, state, benefits, eligibility_criteria, required_documents, application_process, target_users, official_url, application_url, deadline, verification_status) VALUES
('Demo National Merit Scholarship','demo-national-merit-scholarship','Sample scholarship record showing how merit-based education support is presented on YojnaSetu.','education','Central',NULL,ARRAY['Annual scholarship amount towards tuition','One-time book and stationery grant'],ARRAY['Student currently enrolled in a recognised institution','Age between 16 and 30 years','Annual family income within the notified limit'],ARRAY['Proof of identity','Latest marksheet','Income certificate','Bank passbook copy'],ARRAY['Create an account on the official scholarship portal','Fill the application form and upload documents','Track application status online'],ARRAY['Students'],'https://www.india.gov.in/','https://www.india.gov.in/','2026-12-31','demo'),
('Demo Post-Matric Education Assistance','demo-post-matric-education-assistance','Sample record illustrating post-matric education assistance for students continuing higher studies.','education','State','Maharashtra',ARRAY['Tuition fee reimbursement','Maintenance allowance for hostellers'],ARRAY['Student pursuing a course after class 10','Resident of the implementing state','Family income within the notified limit'],ARRAY['Domicile certificate','Admission proof','Income certificate'],ARRAY['Register on the state scholarship portal','Submit the application through your institution','Await institution and department verification'],ARRAY['Students'],'https://www.india.gov.in/','https://www.india.gov.in/','2026-10-31','demo'),
('Demo Skill Training Voucher','demo-skill-training-voucher','Sample record showing a short-term skill development and certification programme.','employment','Central',NULL,ARRAY['Fully funded short-term training','Certification on successful completion','Placement assistance support'],ARRAY['Age between 18 and 45 years','Currently unemployed or seeking better employment'],ARRAY['Proof of identity','Address proof','Educational qualification proof'],ARRAY['Find an empanelled training centre','Enrol in a course of your choice','Complete training and assessment'],ARRAY['Unemployed','Students'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Apprenticeship Stipend Support','demo-apprenticeship-stipend-support','Sample record describing stipend support for apprentices during on-the-job training.','employment','Central',NULL,ARRAY['Monthly stipend support during apprenticeship','Recognised completion certificate'],ARRAY['Age 18 years or above','Enrolled with a participating employer'],ARRAY['Proof of identity','Educational certificates','Bank account details shared with employer'],ARRAY['Register on the apprenticeship portal','Apply to listed employers','Begin apprenticeship after selection'],ARRAY['Students','Unemployed'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Women Entrepreneurship Loan','demo-women-entrepreneurship-loan','Sample record showing collateral-free credit support designed for women entrepreneurs.','women','Central',NULL,ARRAY['Collateral-free working capital loan','Interest subvention on timely repayment','Mentoring and business guidance'],ARRAY['Woman applicant aged 18 years or above','Business plan or existing small enterprise'],ARRAY['Proof of identity','Business registration or plan','Bank statements'],ARRAY['Approach a participating bank branch','Submit your business plan','Complete loan appraisal formalities'],ARRAY['Women','Self-employed','Business Owners'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Girl Child Education Savings','demo-girl-child-education-savings','Sample record for a long-term savings scheme intended to support a girl child''s education.','women','Central',NULL,ARRAY['Attractive long-term savings returns','Partial withdrawal allowed for higher education'],ARRAY['Account opened in the name of a girl child','Guardian to operate the account until maturity age'],ARRAY['Birth certificate of the child','Guardian identity proof','Address proof'],ARRAY['Visit a participating bank or post office','Fill the account opening form','Make the initial deposit'],ARRAY['Women'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Women Skill and Livelihood Grant','demo-women-skill-livelihood-grant','Sample record for livelihood training and self-help group support for women.','women','State','Karnataka',ARRAY['Free vocational training','Seed grant for self-help groups'],ARRAY['Woman applicant aged 18 years or above','Member of a registered self-help group where applicable'],ARRAY['Proof of identity','Self-help group membership proof'],ARRAY['Contact the district women and child development office','Complete enrolment formalities','Attend the training programme'],ARRAY['Women','Unemployed'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Farmer Income Support','demo-farmer-income-support','Sample record showing direct income support instalments for small and marginal farmers.','agriculture','Central',NULL,ARRAY['Direct income support in periodic instalments','Support credited to the registered bank account'],ARRAY['Landholding farmer family','Land records available in the applicant''s name'],ARRAY['Land ownership records','Proof of identity','Bank account details'],ARRAY['Register at the nearest common service centre','Verify land records','Track instalment status online'],ARRAY['Farmers'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Crop Insurance Cover','demo-crop-insurance-cover','Sample record explaining how a crop insurance product would appear on the platform.','agriculture','Central',NULL,ARRAY['Insurance cover against notified crop losses','Low farmer premium share'],ARRAY['Farmer growing a notified crop in a notified area','Enrolment before the seasonal cut-off date'],ARRAY['Land records','Sowing declaration','Bank account details'],ARRAY['Enrol through your bank or insurance intermediary','Pay the farmer share of premium','Report crop loss within the notified window'],ARRAY['Farmers'],'https://www.india.gov.in/','https://www.india.gov.in/','2026-07-31','demo'),
('Demo Startup Seed Assistance','demo-startup-seed-assistance','Sample record for early-stage seed assistance offered to recognised startups.','startup','Central',NULL,ARRAY['Seed funding for prototype development','Support for market entry and validation'],ARRAY['Recognised startup within the notified age of incorporation','Innovative product or service offering'],ARRAY['Incorporation certificate','Pitch deck','Financial statements where available'],ARRAY['Apply through an empanelled incubator','Present to the selection committee','Sign the funding agreement'],ARRAY['Business Owners','Self-employed'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Micro Enterprise Credit Support','demo-micro-enterprise-credit-support','Sample record for small-ticket credit support for micro and small enterprises.','startup','Central',NULL,ARRAY['Small-ticket business loans','No collateral required for eligible categories'],ARRAY['Micro or small non-farm enterprise','Viable business activity'],ARRAY['Proof of identity','Business address proof','Quotation or business plan'],ARRAY['Approach a participating lender','Submit the loan application','Complete verification and disbursal'],ARRAY['Self-employed','Business Owners'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Affordable Housing Assistance','demo-affordable-housing-assistance','Sample record describing housing assistance for eligible households.','welfare','Central',NULL,ARRAY['Interest subsidy on home loans','Assistance for construction of a pucca house'],ARRAY['Household without a pucca house','Family income within the notified category limit'],ARRAY['Proof of identity','Income proof','Property or land documents'],ARRAY['Apply online or at the local urban body','Complete field verification','Receive assistance in instalments'],ARRAY['General Public'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Health Coverage for Families','demo-health-coverage-for-families','Sample record for a family health coverage scheme with cashless treatment.','welfare','Central',NULL,ARRAY['Annual family health cover','Cashless treatment at empanelled hospitals'],ARRAY['Household listed in the eligible database','Valid identity verification at the hospital'],ARRAY['Proof of identity','Family details as recorded'],ARRAY['Check eligibility at a common service centre','Generate your health card','Use the card at empanelled hospitals'],ARRAY['General Public'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo'),
('Demo Old Age Pension Support','demo-old-age-pension-support','Sample record for a monthly pension programme for senior citizens.','welfare','State','Uttar Pradesh',ARRAY['Monthly pension credited to the bank account'],ARRAY['Applicant aged 60 years or above','Family income within the notified limit'],ARRAY['Age proof','Income certificate','Bank account details'],ARRAY['Apply at the local welfare office or online portal','Complete verification','Receive monthly pension'],ARRAY['Senior Citizens'],'https://www.india.gov.in/','https://www.india.gov.in/',NULL,'demo');
