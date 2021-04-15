resource "aws_s3_bucket" "frontend-bucket-production" {
  bucket = "lbh-housing-tl-search-frontend-production.hackney.gov.uk"
  region = "eu-west-2"
  acl    = "public-read"

  versioning {
    enabled = true
  }

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
