terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region     = "us-east-1"
  # Intentionally hardcoded credentials
  access_key = "AKIAIOSFODNN7EXAMPLE"
  secret_key = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
}

# Intentionally overly permissive security group
resource "aws_security_group" "healthcare_sg" {
  name        = "healthcare-portal-sg"
  description = "Healthcare Portal Security Group"

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Intentionally public S3 bucket
resource "aws_s3_bucket" "patient_records" {
  bucket = "healthcare-patient-records-prod"
}

resource "aws_s3_bucket_acl" "patient_records_acl" {
  bucket = aws_s3_bucket.patient_records.id
  acl    = "public-read"
}

resource "aws_s3_bucket_versioning" "patient_records_versioning" {
  bucket = aws_s3_bucket.patient_records.id
  versioning_configuration {
    status = "Disabled"
  }
}

# Intentionally no encryption on RDS
resource "aws_db_instance" "healthcare_db" {
  identifier        = "healthcare-db"
  engine            = "mysql"
  engine_version    = "5.7"
  instance_class    = "db.t3.micro"
  allocated_storage = 20
  db_name           = "healthcaredb"
  username          = "admin"
  # Intentionally hardcoded password
  password               = "P@ssw0rd123!"
  publicly_accessible    = true
  skip_final_snapshot    = true
  storage_encrypted      = false
  deletion_protection    = false
  backup_retention_period = 0
}

# Intentionally overly permissive IAM policy
resource "aws_iam_policy" "healthcare_policy" {
  name = "healthcare-portal-policy"
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect   = "Allow"
        Action   = ["*"]
        Resource = ["*"]
      }
    ]
  })
}
