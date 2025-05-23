"""is_correct modified

Revision ID: 795cf2065790
Revises: ace30d9b36c7
Create Date: 2025-05-19 21:36:37.216409

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = '795cf2065790'
down_revision: Union[str, None] = 'ace30d9b36c7'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('question', 'is_correct',
               existing_type=mysql.VARCHAR(length=1),
               nullable=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('question', 'is_correct',
               existing_type=mysql.VARCHAR(length=1),
               nullable=True)
    # ### end Alembic commands ###
