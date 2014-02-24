# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding field 'Image.username'
        db.add_column(u'instagallery_image', 'username',
                      self.gf('django.db.models.fields.CharField')(default='test', max_length=256),
                      keep_default=False)


    def backwards(self, orm):
        # Deleting field 'Image.username'
        db.delete_column(u'instagallery_image', 'username')


    models = {
        u'instagallery.image': {
            'Meta': {'object_name': 'Image'},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'instagram_id': ('django.db.models.fields.CharField', [], {'max_length': '256', 'db_index': 'True'}),
            'link': ('django.db.models.fields.URLField', [], {'max_length': '200'}),
            'tag': ('django.db.models.fields.related.ForeignKey', [], {'to': u"orm['instagallery.Tag']"}),
            'thumbnail_url': ('django.db.models.fields.URLField', [], {'max_length': '200'}),
            'updated_date': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'username': ('django.db.models.fields.CharField', [], {'max_length': '256'})
        },
        u'instagallery.tag': {
            'Meta': {'object_name': 'Tag'},
            'created_date': ('django.db.models.fields.DateTimeField', [], {'auto_now_add': 'True', 'blank': 'True'}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'last_processed_date': ('django.db.models.fields.DateTimeField', [], {}),
            'semaphore': ('django.db.models.fields.BooleanField', [], {'default': 'False'}),
            'tag': ('django.db.models.fields.CharField', [], {'max_length': '256'}),
            'updated_date': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'})
        }
    }

    complete_apps = ['instagallery']