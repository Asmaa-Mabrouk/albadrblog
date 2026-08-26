-- Add a real sortable date column (separate from the display string,
-- since Arabic-formatted dates like "٢٠ مارس ٢٠٢٦" can't be ORDER BY'd correctly)
alter table public.articles add column if not exists sort_date date;

-- Backfill sort_date for existing articles based on their display date
update public.articles set sort_date = '2026-04-10' where title = 'تمكين الشباب في عصر التحديات';
update public.articles set sort_date = '2026-04-02' where title = 'قيادة التحول في المؤسسات';
update public.articles set sort_date = '2026-03-20' where title = 'هل أنت ضيف في المجلس؟';
update public.articles set sort_date = '2026-03-15' where title = 'فن القيادة الفعّالة';
update public.articles set sort_date = '2026-03-08' where title = 'ريادة الأعمال في المنطقة';
update public.articles set sort_date = '2026-03-01' where title = 'استراتيجيات النجاح المهني';
update public.articles set sort_date = '2026-02-22' where title = 'مهارة تحتاجها حتى لو كنت عبقريًا';
update public.articles set sort_date = '2026-02-12' where title = 'ماذا يخبرك رمضان عن نفسك؟';
update public.articles set sort_date = '2026-02-03' where title = 'مهارة يغفل عنها الكثيرون، تعلمها في 3 خطوات';
update public.articles set sort_date = '2024-01-15' where title = 'لا تقلق فتحترق! 7 نصائح فعالة لتجنب الاحتراق الوظيفي.';
update public.articles set sort_date = '2023-09-05' where title = '6 أشهرٍ من التحضير لـ 6 ساعاتٍ من الألم... وإنجاز لا يُقدر بالزمن';
update public.articles set sort_date = '2023-02-25' where title = 'صراع أجيال أم صراع عقول؟';
update public.articles set sort_date = '2023-01-05' where title = 'هل يغرق موظفيك في دوامة من التساؤلات؟ 3 أعراض خطيرة للغموض وحلولها';

-- Make sure only "هل أنت ضيف في المجلس؟" is marked as the featured/homepage article
update public.articles set featured = false;
update public.articles set featured = true where title = 'هل أنت ضيف في المجلس؟';
