class Annotation < ActiveRecord::Base
  validates :author_id, :body, :step_id, presence: true

  belongs_to :author,
    class_name: "User",
    foreign_key: :author_id,
    primary_key: :id

  belongs_to :step,
    class_name: "Step",
    foreign_key: :step_id,
    primary_key: :id
end
