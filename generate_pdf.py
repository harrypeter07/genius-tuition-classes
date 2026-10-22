import os
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    KeepTogether,
    HRFlowable,
)
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.5)
        self.line(40, 35, 555, 35)
        
        footer_text = "Genius Tuition Classes • Koradi, Nagpur • Guidance by AKRAM SIR (+91 91756 91457)"
        self.drawString(40, 24, footer_text)
        
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(555, 24, page_str)
        self.restoreState()

def build_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=40,
        rightMargin=40,
        topMargin=40,
        bottomMargin=50,
    )

    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0f172a'),
    )
    
    subtitle_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=14,
        textColor=colors.HexColor('#2563eb'),
        spaceAfter=15,
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#0f172a'),
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True,
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#1e293b'),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True,
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        spaceAfter=6,
    )

    callout_style = ParagraphStyle(
        'Callout',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor('#1e40af'),
    )

    code_style = ParagraphStyle(
        'Code',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor('#0f172a'),
    )

    story = []

    # Title & Header
    story.append(Paragraph("Genius Tuition Classes", title_style))
    story.append(Paragraph("ADMINISTRATOR MANUAL & CLOUD DATABASE ARCHITECTURE", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=colors.HexColor('#2563eb'), spaceAfter=12))

    # Overview Callout
    meta_table_data = [
        [
            Paragraph("<b>Institute:</b> Genius Tuition Classes", body_style),
            Paragraph("<b>Lead Mentor:</b> AKRAM SIR (+91 91756 91457)", body_style),
        ],
        [
            Paragraph("<b>Center:</b> Koradi, Nagpur, Maharashtra", body_style),
            Paragraph("<b>Status:</b> Production Live with Cloud DB", body_style),
        ]
    ]
    meta_table = Table(meta_table_data, colWidths=[250, 265])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f8fafc')),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 10))

    # Section 1
    story.append(Paragraph("1. Cloud PostgreSQL Database Hosting Breakdown", h1_style))
    story.append(Paragraph(
        "The PostgreSQL database powering Genius Tuition Classes is <b>100% cloud-hosted</b> and managed on enterprise infrastructure. It is <b>not stored locally</b> on your PC, ensuring 24/7 continuous uptime and persistent data storage even when your laptop is turned off.",
        body_style
    ))

    db_data = [
        [Paragraph("<b>Parameter</b>", body_style), Paragraph("<b>Cloud Specification</b>", body_style)],
        [Paragraph("<b>Cloud Provider</b>", body_style), Paragraph("<b>Supabase Cloud Infrastructure</b>", body_style)],
        [Paragraph("<b>Underlying Cloud Host</b>", body_style), Paragraph("<b>Amazon Web Services (AWS)</b>", body_style)],
        [Paragraph("<b>Datacenter Region</b>", body_style), Paragraph("<b>ap-southeast-2 (Asia Pacific)</b>", body_style)],
        [Paragraph("<b>Connection Pool Host</b>", body_style), Paragraph("<code>aws-1-ap-southeast-2.pooler.supabase.com:5432</code>", code_style)],
        [Paragraph("<b>Encryption & Security</b>", body_style), Paragraph("SSL/TLS Enabled Connection Pooling", body_style)],
        [Paragraph("<b>Database Engine</b>", body_style), Paragraph("PostgreSQL 15+ Enterprise", body_style)],
    ]
    db_table = Table(db_data, colWidths=[150, 365])
    db_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e2e8f0')),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#94a3b8')),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(db_table)
    story.append(Spacer(1, 8))

    story.append(Paragraph("<b>Active Cloud Database Tables:</b>", h2_style))
    tables_list = [
        "<b>• genius_inquiries:</b> Captures incoming admission inquiries (student name, parent phone, grade, subjects, batch preference, notes, status, and created timestamp).",
        "<b>• genius_settings:</b> Dynamic site configuration: Akram Sir's name, phone, WhatsApp number, Koradi address, visiting hours, announcement text.",
        "<b>• genius_classes:</b> Offline batches (Class 5-8th Foundation, 9th Pre-board, 10th Board, 11-12th), limits (max 18), and timings.",
        "<b>• genius_teachers:</b> Educator profiles, qualifications, and Akram Sir's mentorship highlights.",
        "<b>• genius_testimonials:</b> High-scoring board percentages (96.4%, 94.8%, 98 in Maths) and verified parent feedback.",
        "<b>• genius_faqs:</b> Parent FAQs addressing offline policies and small batch advantages."
    ]
    for item in tables_list:
        story.append(Paragraph(item, body_style))

    story.append(Spacer(1, 10))

    # Section 2
    story.append(Paragraph("2. URLs & Administrator Access Credentials", h1_style))
    urls_data = [
        [Paragraph("<b>Portal</b>", body_style), Paragraph("<b>URL</b>", body_style), Paragraph("<b>Credentials</b>", body_style)],
        [
            Paragraph("<b>Live Website</b>", body_style),
            Paragraph("<b>https://genius-tuition-classes.vercel.app</b>", body_style),
            Paragraph("Public Access", body_style)
        ],
        [
            Paragraph("<b>Admin Management Portal</b>", body_style),
            Paragraph("<b>https://genius-tuition-classes.vercel.app/admin</b>", body_style),
            Paragraph("<b>PIN: 2026</b><br/>Password: akramsir2026", body_style)
        ],
        [
            Paragraph("<b>GitHub Source Code</b>", body_style),
            Paragraph("<b>github.com/harrypeter07/genius-tuition-classes</b>", body_style),
            Paragraph("Branch: main", body_style)
        ],
    ]
    urls_table = Table(urls_data, colWidths=[130, 240, 145])
    urls_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#e2e8f0')),
        ('BOX', (0, 0), (-1, -1), 0.5, colors.HexColor('#94a3b8')),
        ('INNERGRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#cbd5e1')),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
    ]))
    story.append(urls_table)
    story.append(Spacer(1, 10))

    # Section 3
    story.append(Paragraph("3. Step-by-Step Administrator Tutorial", h1_style))
    
    story.append(Paragraph("<b>Step 1: Logging in to the Admin Panel</b>", h2_style))
    story.append(Paragraph(
        "Open <code>https://genius-tuition-classes.vercel.app/admin</code> in any browser (mobile, tablet, or PC). Enter PIN <b>2026</b> or password <b>akramsir2026</b>, then tap <b>Unlock Admin Panel</b>.",
        body_style
    ))

    story.append(Paragraph("<b>Step 2: Managing Student & Parent Inquiries</b>", h2_style))
    story.append(Paragraph(
        "Under the <b>Admission Inquiries</b> tab, all new form leads appear in real time. Each lead displays the student's name, parent's contact number, class/grade, subjects, preferred batch (Morning/Evening), and notes.<br/>"
        "• <b>1-Click Call:</b> Tap the <b>Call</b> button to dial the parent immediately.<br/>"
        "• <b>1-Click WhatsApp:</b> Tap the <b>WhatsApp</b> button to open a pre-drafted chat with the parent from Akram Sir offering a 2-day demo class.<br/>"
        "• <b>Status Tracking:</b> Switch status between <i>New</i>, <i>Contacted</i>, <i>Admitted</i>, or <i>Archived</i> to manage student onboarding.",
        body_style
    ))

    story.append(Paragraph("<b>Step 3: Updating Contact Numbers & Institute Details</b>", h2_style))
    story.append(Paragraph(
        "Under the <b>Institute & Contact Info</b> tab, you can update Akram Sir's phone number, WhatsApp number, visiting hours, or the Koradi address. You can also edit the <b>Announcement Banner</b> (e.g., <i>'Admissions Open for Class 10th New Batch'</i>). Click <b>Save Changes to Database</b> to update the live website instantly.",
        body_style
    ))

    story.append(Paragraph("<b>Step 4: Managing Batches, Faculty & Topper Results</b>", h2_style))
    story.append(Paragraph(
        "• <b>Batches Tab:</b> Review and enforce the strictly capped batch size of 15–18 students.<br/>"
        "• <b>Faculty Tab:</b> Keep teacher credentials and subject focus updated.<br/>"
        "• <b>Toppers Tab:</b> Showcase newly announced board percentages (e.g. 96.4%, 98/100 in Maths) to maintain strong reputation in Koradi, Nagpur.",
        body_style
    ))

    story.append(Spacer(1, 8))
    story.append(Paragraph("4. Marketing Strategy & Offline Classroom Positioning", h1_style))
    story.append(Paragraph(
        "Genius Tuition Classes is positioned strictly as an <b>offline coaching institute</b>. The website emphasizes zero phone distractions, instant on-the-spot notebook checks, simulated Sunday exam conditions, and direct monthly Parent-Teacher meetings in Koradi, Nagpur.",
        body_style
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"PDF generated successfully: {filename}")

if __name__ == '__main__':
    build_pdf("public/Genius_Tuition_Classes_Admin_Manual.pdf")
    build_pdf("Genius_Tuition_Classes_Admin_Manual.pdf")
    build_pdf(r"C:\Users\ASUS\.gemini\antigravity\brain\14fc8c2f-9fd5-47d7-a1ed-f52f2182a9c5\Genius_Tuition_Classes_Admin_Manual.pdf")
