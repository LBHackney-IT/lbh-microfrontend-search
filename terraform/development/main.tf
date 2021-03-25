
resource "aws_s3_bucket" "b" {
  bucket = "lbh-housing-tenancy-lease-frontend-development.hackney.gov.uk"
  acl    = "public-read"
 # policy = 

}