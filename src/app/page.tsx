diff --git a/src/app/page.tsx b/src/app/page.tsx
index e8d8bcb14aa8d2408b2582762af28c19b6522523..1a7520535ae5d91ac24235a98253c7d0e2dc0cd5 100644
--- a/src/app/page.tsx
+++ b/src/app/page.tsx
@@ -82,103 +82,108 @@ export default function LandingPage() {
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-400/10 blur-[120px] rounded-full -z-10" 
         />
       </section>
 
       {/* SCROLL REVEAL BENTO GRID */}
       <section id="services" className="px-6 py-40 bg-slate-50 relative z-20 rounded-t-[4rem]">
         <div className="max-w-7xl mx-auto">
           <motion.div 
             initial="hidden"
             whileInView="visible"
             viewport={{ once: true, margin: "-100px" }}
             variants={containerVariants}
           >
             <motion.div variants={itemVariants} className="mb-24 text-center md:text-left">
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter">Choose a path.</h2>
               <div className="h-3 w-40 bg-blue-600 rounded-full mt-4 mx-auto md:mx-0" />
             </motion.div>
 
             <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
               <BentoCard 
                 span="md:col-span-8"
                 title="Personal Legal"
                 price="1,999"
                 icon={<Scale />}
                 color="bg-blue-600 text-white"
+                href="/services/police"
                 items={["Police Complaint", "Cyber Fraud", "Consumer Court"]}
               />
               <BentoCard 
                 span="md:col-span-4"
                 title="Tax/ITR"
                 price="999"
                 icon={<FileText />}
                 color="bg-white text-slate-900 border border-slate-200"
+                href="/services/itr"
                 items={["ITR Filing", "GST Returns"]}
               />
               <BentoCard 
                 span="md:col-span-4"
                 title="Business"
                 price="3,999"
                 icon={<Briefcase />}
                 color="bg-slate-900 text-white"
+                href="/services/registration"
                 items={["Trademark", "Incorporation"]}
               />
               <BentoCard 
                 span="md:col-span-8"
                 title="Premium Consultation"
                 price="Custom"
                 icon={<Globe />}
                 color="bg-white text-slate-900 border border-slate-200"
+                href="/services/ipo"
                 items={["IPO Strategy", "Athlete Contracts", "International Law"]}
               />
             </div>
           </motion.div>
         </div>
       </section>
 
       {/* FINAL MOTION CTA */}
       <section className="px-6 py-40 text-center">
         <motion.div
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
         >
           <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-12">
             Finish the race. <br /> Get legal help today.
           </h2>
           <Link href="/login" className="bg-blue-600 text-white font-black py-8 px-20 rounded-[3rem] text-2xl hover:scale-105 active:scale-95 transition-all inline-block shadow-3xl shadow-blue-100">
             Start Now
           </Link>
         </motion.div>
       </section>
 
     </main>
   );
 }
 
-function BentoCard({ title, price, icon, color, items, span }: any) {
+function BentoCard({ title, price, icon, color, items, span, href }: any) {
   return (
-    <motion.div 
-      variants={itemVariants}
-      whileHover={{ y: -10, scale: 1.01 }}
-      className={`${span} ${color} p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group`}
-    >
-      <div className="flex justify-between items-start mb-12">
-        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
-          {icon}
+    <motion.div variants={itemVariants} whileHover={{ y: -10, scale: 1.01 }} className={span}>
+      <Link
+        href={href}
+        className={`${color} p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group block focus:outline-none focus:ring-2 focus:ring-blue-500`}
+      >
+        <div className="flex justify-between items-start mb-12">
+          <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
+            {icon}
+          </div>
+          <div className="text-right uppercase tracking-widest text-[10px] font-black opacity-80">
+            Starts At <span className="text-2xl block">₹{price}</span>
+          </div>
         </div>
-        <div className="text-right uppercase tracking-widest text-[10px] font-black opacity-80">
-          Starts At <span className="text-2xl block">₹{price}</span>
+        <h3 className="text-4xl font-black mb-8">{title}</h3>
+        <div className="flex flex-wrap gap-2">
+          {items.map((item: string) => (
+            <div key={item} className="px-6 py-3 rounded-full bg-black/5 backdrop-blur-sm flex justify-between items-center text-xs font-black uppercase tracking-tighter border border-black/5 hover:bg-blue-600 hover:text-white transition-all">
+              {item} <ChevronRight className="w-3 h-3 ml-2" />
+            </div>
+          ))}
         </div>
-      </div>
-      <h3 className="text-4xl font-black mb-8">{title}</h3>
-      <div className="flex flex-wrap gap-2">
-        {items.map((item: string) => (
-          <div key={item} className="px-6 py-3 rounded-full bg-black/5 backdrop-blur-sm flex justify-between items-center text-xs font-black uppercase tracking-tighter border border-black/5 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
-            {item} <ChevronRight className="w-3 h-3 ml-2" />
-          </div>
-        ))}
-      </div>
+      </Link>
     </motion.div>
   );
-}
\ No newline at end of file
+}
