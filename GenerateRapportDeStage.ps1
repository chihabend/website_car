Param(
    [string]$OutputPath = "rapport_de_stage.docx",
    [string]$Titre = "Rapport de stage",
    [string]$Etudiant = "Nom Prénom",
    [string]$Formation = "Formation / Filière",
    [string]$Entreprise = "Nom de l'entreprise",
    [string]$Tuteur = "Tuteur / Encadrant",
    [string]$Periode = "Période du stage (jj/mm/aaaa - jj/mm/aaaa)",
    [string]$Annee = "Année universitaire",
    [string]$Resume = "Résumé (5-8 lignes)",
    [string]$MotsCles = "mots-clés, séparés, par, virgules"
)

function New-Word(){
    try { return New-Object -ComObject Word.Application } catch { return $null }
}

function Add-Heading([object]$doc, [string]$text, [int]$level){
    $p = $doc.Content.Paragraphs.Add()
    $p.Range.Text = $text
    $p.Range.set_Style("Heading $level") | Out-Null
    $p.Range.InsertParagraphAfter() | Out-Null
}

function Add-Paragraph([object]$doc, [string]$text){
    $p = $doc.Content.Paragraphs.Add()
    $p.Range.Text = $text
    $p.Range.set_Style("Normal") | Out-Null
    $p.Range.InsertParagraphAfter() | Out-Null
}

function Add-PageBreak([object]$doc){
    $doc.Content.Paragraphs.Add().Range.InsertBreak(7) | Out-Null
}

function Add-Cover([object]$doc){
    $sel = $doc.Application.Selection
    $sel.ParagraphFormat.Alignment = 1
    $sel.Font.Size = 28
    $sel.TypeText($Titre)
    $sel.TypeParagraph()
    $sel.TypeParagraph()
    $sel.Font.Size = 16
    $sel.TypeText("Étudiant : $Etudiant")
    $sel.TypeParagraph()
    $sel.TypeText("Formation : $Formation")
    $sel.TypeParagraph()
    $sel.TypeText("Entreprise : $Entreprise")
    $sel.TypeParagraph()
    $sel.TypeText("Tuteur : $Tuteur")
    $sel.TypeParagraph()
    $sel.TypeText("Période : $Periode")
    $sel.TypeParagraph()
    $sel.TypeText("Année : $Annee")
    $sel.TypeParagraph()
    $sel.ParagraphFormat.Alignment = 0
}

function Add-TOC([object]$doc){
    $range = $doc.Range(0,0)
    $doc.TablesOfContents.Add($range, $true, 1, 3) | Out-Null
    Add-PageBreak $doc
}

function Add-Section([object]$doc, [string]$title, [string[]]$paragraphs){
    Add-Heading $doc $title 1
    foreach($p in $paragraphs){
        Add-Paragraph $doc $p
    }
}

function Add-SubSection([object]$doc, [string]$title, [string[]]$paragraphs){
    Add-Heading $doc $title 2
    foreach($p in $paragraphs){
        Add-Paragraph $doc $p
    }
}

$word = New-Word
if(-not $word){
    Write-Error "Microsoft Word n'est pas disponible via COM. Ouvrez PowerShell en 64-bit et assurez-vous que Word est installé."
    exit 1
}

$word.Visible = $false
$doc = $word.Documents.Add()

# Page de garde
Add-Cover $doc
Add-PageBreak $doc

# Table des matières
Add-TOC $doc

# Résumé et mots-clés
Add-Heading $doc "Résumé" 1
Add-Paragraph $doc $Resume
Add-Heading $doc "Mots-clés" 2
Add-Paragraph $doc $MotsCles
Add-PageBreak $doc

# Sections principales
Add-Section $doc "Remerciements" @("Remerciez brièvement les personnes et organismes qui vous ont encadré.")

Add-Section $doc "Introduction" @(
    "Présentez le contexte du stage, les objectifs généraux et l'organisation du document."
)

Add-Section $doc "Présentation de l'entreprise" @(
    "Historique, secteur d'activité, taille, organigramme, produits et services."
)

Add-Section $doc "Contexte et objectifs du stage" @(
    "Décrivez la mission confiée, le périmètre, les enjeux et les contraintes."
)

Add-Section $doc "Travaux réalisés" @()
Add-SubSection $doc "Méthodologie" @("Décrivez votre démarche, outils et technologies utilisés.")
Add-SubSection $doc "Développement / Réalisation" @("Détaillez les tâches menées, livrables et résultats.")
Add-SubSection $doc "Difficultés rencontrées et solutions" @("Expliquez les obstacles et comment vous les avez surmontés.")

Add-Section $doc "Résultats et évaluation" @(
    "Présentez les résultats, indicateurs et critères d'évaluation."
)

Add-Section $doc "Compétences acquises" @(
    "Listez les compétences techniques, méthodologiques et comportementales développées."
)

Add-Section $doc "Conclusion et perspectives" @(
    "Bilan du stage, recommandations et pistes d'amélioration."
)

Add-Heading $doc "Bibliographie / Webographie" 1
Add-Paragraph $doc "[1] Référence 1"
Add-Paragraph $doc "[2] Référence 2"

Add-Heading $doc "Annexes" 1
Add-Paragraph $doc "Annexe A : ..."

# Mettre à jour la table des matières
foreach($toc in $doc.TablesOfContents){ $toc.Update() | Out-Null }

# Sauvegarde
$fullPath = Join-Path -Path (Get-Location) -ChildPath $OutputPath
$doc.SaveAs([ref]$fullPath)
$doc.Close()
$word.Quit()

Write-Host "Fichier généré : $fullPath"

